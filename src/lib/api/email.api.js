import nodemailer from "nodemailer";
import { variablesEmail } from "../../utils/params/const.email.js";
import { responseEmail } from "../../common/enum/email/response.email.js";
import { htmlTemplateRegister } from "../../ui/template/register/index.js";
import { htmlTemplateApproved } from "../../ui/template/approve/index.js";
import { htmlTemplateDenied } from "../../ui/template/denied/index.js";
import { htmlTemplateClub } from "../../ui/template/club/index.js";
import { generateToken, verifyToken } from "../../utils/token/handle-token.js";

var host_ = variablesEmail.host
var port_ = variablesEmail.port
var user_ = variablesEmail.user
var password_ = variablesEmail.password

const transporter = nodemailer.createTransport({
    host: host_,
    port: port_,
    auth: {
        user: `${user_}`,
        pass: `${password_}`
    }
});

async function mailApproved(name, username, password, email, role_user) {
    let url = `username=${username}&password=${password}&role_user=${role_user}`
    let tokenDecoded = await generateToken({
        sub: username,
        token: url
    })
    let usernameDecoded = await verifyToken(username);
    let passwordDecoded = await verifyToken(password);
    let roleDecoded = await verifyToken(role_user);

    try {
        const my = await transporter.sendMail({
            from: `D10+ Academy <${user_}>`,
            to: `"${email}"`,
            subject: "Solicitud aprobada ⚽😁",
            html: htmlTemplateApproved(name, usernameDecoded.username, passwordDecoded.password, roleDecoded.role, tokenDecoded),
        });

        return responseEmail.success({
            message: "Success send mail",
            messageId: my.messageId,
            mail: {
                from: my.envelope.from,
                to: my.envelope.to
            }
        });
    } catch (error) {
        return responseEmail.error({
            message: "Error send mail",
            data: []
        });
    }
}

async function mailRegisterUser(name, email) {
    try {
        const my = await transporter.sendMail({
            from: `D10+ Academy <${user_}>`,
            to: `"${email}"`,
            subject: "Registro realizado ⚽😉",
            html: htmlTemplateRegister(name)
        });

        return responseEmail.success({
            message: "Success send mail",
            messageId: my.messageId,
            mail: {
                from: my.envelope.from,
                to: my.envelope.to
            }
        });
    } catch (error) {
        return responseEmail.error({
            message: "Error send mail",
            data: []
        });
    }
}

async function mailRegisterClub(club, name, email, rol) {
    try {
        const my = await transporter.sendMail({
            from: `D10+ Academy <${user_}>`,
            to: `"${email}"`,
            subject: "Nuevo registro solicitado ⚽😉",
            html: htmlTemplateClub(club, name, email, rol)
        });

        return responseEmail.success({
            message: "Success send mail",
            messageId: my.messageId,
            mail: {
                from: my.envelope.from,
                to: my.envelope.to
            }
        });
    } catch (error) {
        return responseEmail.error({
            message: "Error send mail",
            data: []
        });
    }
}

async function mailDenied(name, email) {
    try {
        const my = await transporter.sendMail({
            from: `D10+ Academy <${user_}>`,
            to: `"${email}"`,
            subject: "Registro denegado ⚽🫤",
            html: htmlTemplateDenied(name)
        });

        return responseEmail.success({
            message: "Success send mail",
            messageId: my.messageId,
            mail: {
                from: my.envelope.from,
                to: my.envelope.to
            }
        });
    } catch (error) {
        return responseEmail.error({
            message: "Error send mail",
            data: []
        });
    }
}

async function main(name, username, password, email, type, role_user) {
    let response;
    if (type == 'approved') {
        response = await mailApproved(name, username, password, email, role_user)
    } else if (type == 'register_user') {
        response = await mailRegisterUser(name, email)
    } else if (type == 'register_club') {
        response = await mailRegisterClub(name, username, email, role_user)
    } else if (type == 'denied') {
        response = await mailDenied(name, email)
    } else if (type == undefined || type == null) {
        return responseEmail.error({
            message: "Error send mail",
            data: []
        });
    }
    return responseEmail.success({
        message: response.message,
        messageId: response.messageId,
        mail: response.mail
    });
}

export const sendEmailFunction = async (data) => {
    const { name, username, password, email, type, role_user } = data
    const send = await main(name, username, password, email, type, role_user)
    return send
}

export const sendEmail = async (req, res) => {
    const { name, username, password, email, type, role_user } = req.body
    const send = await main(name, username, password, email, type, role_user)
    res.send(send)
}

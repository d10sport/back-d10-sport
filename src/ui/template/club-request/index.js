export const htmlTemplateClubRequest = (club, name, email, rol) => {
  return `
    <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Registro Denegado</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f8f9fa;
            }

            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .header {
              background: linear-gradient(
                135deg,
                rgba(24, 24, 24, 1) 0%,
                rgba(61, 61, 61, 1) 100%
              );
              color: #ffc702;
              text-align: center;
              padding: 20px;
            }

            .header h1 {
              margin: 0;
              font-size: 24px;
            }

            .content {
              padding: 20px;
              color: #444444;
              text-align: left;
            }

            .content p {
              margin: 15px 0;
              line-height: 1.6;
            }

            .button {
              display: inline-block;
              background-color: #007bff;
              color: white;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              margin-top: 20px;
            }

            .footer {
              background-color: #f8f9fa;
              color: #777777;
              text-align: center;
              padding: 10px;
              font-size: 12px;
            }

            .button--approve {
              background-color: #28a745;
            }

            .button--approve:hover {
              background-color: #218838;
            }

            .button--reject {
              background-color: #dc3545;
            }

            .button--reject:hover {
              background-color: #c82333;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Solicitud de ingreso</h1>
            </div>
            <div class="content">
              <p>Hola <b>${club}</b>,</p>
              <p>
                Te informamos que hay un usuario de tu club que desea ingresar a la
                plataforma, su información es la siguiente:
              </p>
              <ul>
                <li>
                  <p><b>Nombre: </b>${name}</p>
                </li>
                <li>
                  <p><b>Email: </b>${email}</p>
                </li>
                <li>
                  <p><b>Rol: </b>${rol}</p>
                </li>
              </ul>
              <p>
                En caso de que <b>Sí</b> pertenezca dale al botón Verde (Aceptar). Si
                consideras que el usuario <b>NO</b> corresponde al club, deniega su
                entrada dándole al botón Rojo (Denegar).
              </p>
              <div>
                <a
                  href="mailto:soporte@clubexclusivo.com"
                  class="button button--approve"
                  >Aceptar Acceso</a
                >
                <a
                  href="mailto:soporte@clubexclusivo.com"
                  class="button button--reject"
                  >Denegar Acceso</a
                >
              </div>
            </div>
            <div class="footer">
              &copy; 2025 Club Exclusivo. Todos los derechos reservados.
            </div>
          </div>
        </body>
      </html>
  `
}

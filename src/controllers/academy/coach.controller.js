import { responseQueries } from "../../common/enum/queries/response.queries.js";
import { variablesDB } from "../../utils/params/const.database.js";
import getConnection from "../../database/connection.mysql.js";

export const getCoach = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`SELECT * FROM ${db}.coach_user`);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
}

export const registerCoach = async (req, res) => {
  const pool = await getConnection()
  const db = variablesDB.academy
  const { id_club, first_names, last_names, gender, date_birth, country, city, current_club, contact, mail, social_networks, academic_level, licenses_obtained, other } = req.body
  try {
    const insert = await pool.query(`INSERT INTO ${db}.coach_user
      (id_club, first_names, last_names, gender, date_birth, country, city, current_club, contact, mail, social_networks, academic_level, licenses_obtained, other)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_club, first_names, last_names, gender, date_birth, country, city, current_club, contact, mail, social_networks, academic_level, licenses_obtained, other])

    if (insert[0].affectedRows === 0) {
      return res.json(responseQueries.error({ message: "Uninserted records" }))
    }
    return res.json(responseQueries.success({
      message: "Success insert",
      data: [{ insertId: insert[0].insertId }]
    }))
  } catch (error) {
    return res.json(responseQueries.error({
      message: error?.message || "Error inserting",
    }))
  }
}

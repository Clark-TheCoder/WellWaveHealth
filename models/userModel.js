import db from "./db.js";

async function findUserByEmail(email) {
  const [rows] = await db.execute(
    `SELECT id, firstname, lastname, email, position, password FROM users WHERE email = ?`,
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
}

async function createNewUser(firstname, lastname, email, position, password) {
  const [result] = await db.execute(
    `INSERT INTO users (firstname, lastname, email, position, password) VALUES (?, ?, ?, ?, ?)`,
    [firstname, lastname, email, position, password]
  );

  const [rows] = await db.execute(
    `SELECT id, firstname, lastname, email, position FROM users WHERE id = ?`,
    [result.insertId]
  );

  return rows[0];
}

async function updateUser(userId, fieldsToUpdate) {}

export { createNewUser, findUserByEmail };

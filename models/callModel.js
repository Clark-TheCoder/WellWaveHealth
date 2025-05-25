import db from "./db.js";

async function createCall(call_id, provider_id, patient_alias, access_token) {
  try {
    const [result] = await db.execute(
      `INSERT INTO calls (
        call_id,
        provider_id, 
        patient_alias,
        access_token
      ) VALUES (?, ?, ?, ?)
    `,
      [call_id, provider_id, patient_alias, access_token]
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error creating call:", error);
    throw error;
  }
}

async function updateCallStatus(call_id, newStatus) {
  try {
    const [result] = await db.execute(
      `UPDATE calls SET status = ? WHERE call_id = ?`,
      [newStatus, call_id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating call status:", error);
    throw error;
  }
}

async function findCallByAccessToken(accessToken) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM call_logs WHERE access_token = ?",
      [accessToken]
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Error finding call by access token:", error);
    throw error;
  }
}

export { createCall };

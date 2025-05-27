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

async function updateCallStatus(accessToken, newStatus) {
  try {
    const [result] = await db.execute(
      `UPDATE calls SET status = ? WHERE access_token = ?`,
      [newStatus, accessToken]
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
      "SELECT * FROM calls WHERE access_token = ?",
      [accessToken]
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Error finding call by access token:", error);
    throw error;
  }
}

async function getCurrentCalls(userId) {
  try {
    const [rows] = await db.execute(
      `SELECT patient_alias, status, access_token
       FROM calls
       WHERE provider_id = ?
         AND DATE(date_created) = CURDATE()
         AND status IN ('generated', 'completed-not-charted')
      `,
      [userId]
    );

    return rows;
  } catch (error) {
    console.error("Error fetching today's call summaries:", error);
    throw error;
  }
}

async function updateCallNotes(accessToken, formData) {
  const { summary, plan, notes } = formData;

  try {
    const [result] = await db.execute(
      `UPDATE calls
       SET call_notes = JSON_OBJECT(
         'summary', ?,
         'plan', ?,
         'notes', ?
       )
       WHERE access_token = ?`,
      [summary, plan, notes, accessToken]
    );

    return result;
  } catch (error) {
    console.error("Error updating call_notes:", error);
    throw error;
  }
}

export { createCall, getCurrentCalls, updateCallStatus, updateCallNotes };

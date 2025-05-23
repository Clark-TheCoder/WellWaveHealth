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

export { createCall };

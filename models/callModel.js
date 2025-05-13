import db from "./db.js";

async function createCall(call_id, provider_id, patient_alias) {
  try {
    const [result] = await db.execute(
      `INSERT INTO calls (
        call_id,
        provider_id, 
        patient_alias
      ) VALUES (?, ?, ?)
    `,
      [call_id, provider_id, patient_alias]
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error creating call:", error);
    throw error;
  }
}

export { createCall };

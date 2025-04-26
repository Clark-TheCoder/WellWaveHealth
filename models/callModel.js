import db from "./db.js";

async function createCall(provider_id, call_id) {
  try {
    const [result] = await db.execute(
      `INSERT INTO calls (
        call_id,
        provider_id
      ) VALUES (?, ?)
    `,
      [call_id, provider_id]
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error creating call:", error);
    throw error;
  }
}

export { createCall };

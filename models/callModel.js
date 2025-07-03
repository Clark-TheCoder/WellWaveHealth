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

async function updateCallStatus(access_token, userId, newStatus) {
  try {
    const [result] = await db.execute(
      `UPDATE calls SET status = ? WHERE access_token = ? AND provider_id = ?`,
      [newStatus, access_token, userId]
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating call status:", error);
    throw error;
  }
}

async function retrieveCallNotes(access_token, userId) {
  console.log("Searching DB with:", access_token, userId);
  try {
    const [rows] = await db.execute(
      `SELECT call_notes FROM calls WHERE access_token = ? AND provider_id = ?`,
      [access_token, userId]
    );
    console.log("DB rows:", rows);
    return rows[0] || null;
  } catch (err) {
    console.error("DB error:", err);
    throw err; // Don't hide the error
  }
}

async function getCurrentCalls(userId) {
  try {
    const [rows] = await db.execute(
      `SELECT patient_alias, status, access_token
       FROM calls
       WHERE provider_id = ?
         AND DATE(date_created) = CURDATE()
         AND status IN ('generated', 'completed_not_charted')
      `,
      [userId]
    );

    return rows;
  } catch (error) {
    console.error("Error fetching today's call summaries:", error);
    throw error;
  }
}

async function updateCallNotes(access_token, formData) {
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
      [summary, plan, notes, access_token]
    );

    return result;
  } catch (error) {
    console.error("Error updating call_notes:", error);
    throw error;
  }
}

async function retrieveCalls(searchFields) {
  const { exactDate, startRange, endRange, status, alias } = searchFields;

  const filters = [];
  const values = [];

  if (exactDate && status) {
    filters.push("DATE(date_created) = ?");
    values.push(exactDate);
  }

  if (startRange && endRange && status) {
    filters.push("date_created >= ? AND date_created < ?");

    const endDateObj = new Date(endRange);
    endDateObj.setDate(endDateObj.getDate() + 1);
    const endRangePlusOne = endDateObj.toISOString().split("T")[0];

    values.push(startRange, endRangePlusOne);
  }

  if (exactDate && !status) {
    filters.push(
      "DATE(date_created) = ? AND (status = 'completed' OR status = 'cancelled_by_provider' OR status = 'cancelled_by_patient' OR status = 'no_show')"
    );
    values.push(exactDate);
  }

  if (startRange && endRange && !status) {
    filters.push(
      "date_created >= ? AND date_created < ? AND (status = 'completed' OR status = 'cancelled_by_provider' OR status = 'cancelled_by_patient' OR status = 'no_show')"
    );

    const endDateObj = new Date(endRange);
    endDateObj.setDate(endDateObj.getDate() + 1);
    const endRangePlusOne = endDateObj.toISOString().split("T")[0];

    values.push(startRange, endRangePlusOne);
  }

  if (status) {
    filters.push("status = ?");
    values.push(status);
  }
  if (alias) {
    filters.push("patient_alias = ?");
    values.push(alias);
  }

  //combine the clauses into one where clause
  let whereClause = "";
  if (filters.length > 0) {
    whereClause = "WHERE " + filters.join(" AND ");
  }
  try {
    const [results] = await db.execute(
      `SELECT patient_alias, date_created, duration_minutes, status, call_notes from calls ${whereClause}`,
      values
    );
    return results;
  } catch (error) {
    throw error;
  }
}

// async function validateCall(access_token) {
//   console.log("validateCall called with token:", access_token);
//   try {
//     const [rows] = await db.execute(
//       `SELECT status FROM calls WHERE access_token = ? AND call_end_time IS NULL AND status IN ('in_progress', 'generated') `,
//       [access_token]
//     );
//     console.log(rows);
//     return rows.length > 0 ? rows[0] : null;
//   } catch (error) {
//     throw error;
//   }
// }

async function validateCall(access_token) {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM calls WHERE access_token = ? AND call_end_time IS NULL AND status IN ('in_progress', 'generated')`,
      [access_token]
    );
    console.log([rows]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
}

export {
  createCall,
  getCurrentCalls,
  updateCallStatus,
  updateCallNotes,
  retrieveCalls,
  retrieveCallNotes,
  validateCall,
};

//getEmailFromUserID.ts

import pool from "./connect.js";

export default async function getEmailFromUserID(userId: string) {
  const client = await pool.connect();
  try {
    const email = await client.query(
      `SELECT email FROM user_details WHERE user_id = $1`,
      [userId]
    );

    return email.rows[0].email;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  } finally {
    client.release();
  }
}

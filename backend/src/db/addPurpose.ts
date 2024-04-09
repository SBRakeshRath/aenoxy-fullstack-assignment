//addPurpose.ts

import pool from "./connect.js";

export default async function addPurpose(purpose: number, userId: string) {
  try {
    //save purpose to database

    const client = await pool.connect();
    console.log(purpose.toString(), userId)

    const insertPurpose = await client.query(
      `UPDATE user_details SET purpose = $1, signup_step = 3 WHERE user_id = $2`,
      [purpose.toString(), userId]
    );

    console.log(purpose.toString())

    return insertPurpose ? true : false;
  } catch (error) {
    throw new Error(error);
  }
}

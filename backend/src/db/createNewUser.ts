//createNewUser.ts

import pool from "./connect.js";

export default async function createNewUser(
  name: string,
  email: string,
  password: string,
  username: string
) {
  const client = await pool.connect();

  try {
    //generate a user_id of 10 characters
    const user_id = Math.random().toString(36).substring(2, 12);

    const insertUser = await client.query(
      `INSERT INTO user_details (name, email, password, username, signup_step, email_verified,is_active, user_id) VALUES ($1, $2, $3, $4, 1,false,false,$5 ) RETURNING user_id`,
      [name, email, password, username, user_id]
    );

    return insertUser;
  } catch (error) {
    throw new Error(error);
  } finally {
    client.release();
  }
}

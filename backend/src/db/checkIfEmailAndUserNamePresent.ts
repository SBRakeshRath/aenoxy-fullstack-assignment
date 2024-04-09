//checkIfEmailAndUserNamePresent.ts

import pool from "./connect.js";

const checkIfEmailAndUserNamePresent = async (
  email: string,
  username: string
) => {
  const client = await pool.connect();
  try {
    const emailResult = await client.query(
      `SELECT * FROM user_details WHERE email = $1 `,
      [email]
    );

    const usernameResult = await client.query(
      `SELECT * FROM user_details WHERE username = $1 `,
      [username]
    );
    return {
      emailPresent: emailResult.rows.length > 0,
      usernamePresent: usernameResult.rows.length > 0,
    };
  } catch (error) {
    throw new Error(error);
  } finally {
    client.release();
  }
};

export default checkIfEmailAndUserNamePresent;

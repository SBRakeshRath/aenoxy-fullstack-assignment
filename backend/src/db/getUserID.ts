//getUserID.ts

import pool from "./connect.js";

//get userID from email and password

const getUserID = async (email: string, password: string) => {
  try {
    const client = await pool.connect();


    const result = await client.query(
      "SELECT user_id,password FROM user_details WHERE email = $1",
      [email]
    );

    client.release();

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {

    console.log(error)

    return false;
  }
};

export default getUserID;

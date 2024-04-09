//getUserDetails.ts

import pool from "./connect.js";

//get user details from user_id

const getUserDetails = async (user_id: number) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM user_details WHERE user_id = $1",
      [user_id]
    );


    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.log(error);

    return null;
  } finally {
    client.release();
  }
};

export default getUserDetails;

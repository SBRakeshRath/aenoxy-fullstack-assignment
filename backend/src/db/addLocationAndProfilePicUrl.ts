//addLocationAndProfilePicUrl.ts

import pool from "./connect.js";

export default async function addLocationAndProfilePicUrl(
  profilePicUrl: string,
  location: string,
  userId: string
) {
  try {
    //save profile picture and location to database

    const client = await pool.connect();

    const insertProfilePicAndLocation = await client.query(
      `UPDATE user_details SET profile_pic = $1, location = $2, signup_step = 2 WHERE user_id = $3`,
      [profilePicUrl, location, userId]
    );

    return insertProfilePicAndLocation ? true : false;
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
}

//createJWTForLogin.ts

import jwt from "jsonwebtoken";

import { config } from "dotenv";

config();

export default function createJWTForLogin(user_id: string) {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  return token;
}


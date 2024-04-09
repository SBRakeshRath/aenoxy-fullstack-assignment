// emailVerifyTokenJWT.ts

import jwt from "jsonwebtoken";

import { config } from "dotenv";

config();


export default function emailVerifyTokenJWT(userId: string, email: string) {
  return jwt.sign({ userId,email }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
}
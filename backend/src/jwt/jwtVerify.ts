//jwtVerify.ts

import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export default function jwtVerify(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return error;
  }
}

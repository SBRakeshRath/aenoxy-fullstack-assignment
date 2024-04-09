//login.ts

import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import getUserID from "../db/getUserID.js";
import zod from "zod";
import createJWTForLogin from "../jwt/createJWTForLogin.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const email = req.body.email;
  const password = req.body.password;

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    //convert password to hash and compare with the hash in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await getUserID(email, password);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = createJWTForLogin(user.user_id);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default loginRouter;

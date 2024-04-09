//verifyJwtTokenRouter.ts

import { Router } from "express";

import jwtVerify from "../jwt/jwtVerify.js";
import getUserDetails from "../db/getUserDetails.js";

const verifyJwtTokenRouter = Router();

verifyJwtTokenRouter.post("/", async (req, res) => {
  //check for token
  if (!req.headers.authorization) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  //verify token
  const decode = jwtVerify(req.headers.authorization.split(" ")[1]);

  if (decode instanceof Error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  //send user data
  try {
    const result = await getUserDetails(decode.user_id);

    if (!result || result === null) {
      return res.status(404).json({ message: "Unauthorized" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default verifyJwtTokenRouter;

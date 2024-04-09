//addPurposeRouter.ts


import {Router} from "express";


import addPurpose from "../db/addPurpose.js";

import jwtVerify from "../jwt/jwtVerify.js";

import zod from "zod";

const addPurposeRouter = Router();

const purposeSchema = zod.object({
  purpose: zod.number()
});

addPurposeRouter.post("/", async (req, res) => {

  //check for purpose and token

  if(!req.headers.authorization) {
    return res.status(400).json({message: "Unauthorized"});
  }

  if (!req.body.purpose || !req.headers.authorization) {
    return res.status(400).json({message: "Please select at least one purpose"});
  }

  //verify token
  const decode = jwtVerify(req.headers.authorization.split(" ")[1]);

  if (decode instanceof Error) {
    return res.status(401).json({message: "Unauthorized"});
  }

  //validate purpose as string
  const purpose = purposeSchema.safeParse(req.body);

  if (purpose.success) {
    const addPurposeResponse = await addPurpose(purpose.data.purpose, decode.user_id);

    if (addPurposeResponse) {
      return res.status(200).json({message: "Purpose added successfully"});
    } else {
      return res.status(500).json({message: "Internal server error"});
    }
  } else {
    return res.status(400).json({message: "Invalid input"});
  }
});


export default addPurposeRouter;
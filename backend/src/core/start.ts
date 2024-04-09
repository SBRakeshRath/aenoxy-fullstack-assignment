import express from "express";

import { config } from "dotenv";
config();
const PORT = process.env.PORT || 8080;

console.log("PORT", PORT)

const app = express();

import bodyParser from "body-parser";
import createNewUser from "../db/createNewUser.js";
import createNewUserRouter from "../routes/createNewUserRouter.js";
import addProfilePicAndLocationRouter from "../routes/addProfilePicAndLocationRouter.js";
import addPurposeRouter from "../routes/addPurposeRouter.js";
import verifyJwtTokenRouter from "../routes/verifyJwtTokenRouter.js";
import sendEmailToVerifyRouter from "../routes/sendEmailToVerifyRouter.js";

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

import cors from "cors";
import loginRouter from "../routes/login.js";
app.use(cors());

app.use("/createNewUser", createNewUserRouter);
app.use("/addProfilePicAndLocation", addProfilePicAndLocationRouter);
app.use("/addPurpose", addPurposeRouter);
app.use("/verifyToken", verifyJwtTokenRouter);
app.use("/sendEmailToVerify", sendEmailToVerifyRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

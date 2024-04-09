//sendEmailToVerifyRouter.ts

import { Router } from "express";
import jwtVerify from "../jwt/jwtVerify.js";
import getEmailFromUserID from "../db/getEmailFromUserID.js";
import emailVerifyTokenJWT from "../jwt/emailVerifyTokenJWT.js";
import resend from "../email/email.js";

import { config } from "dotenv";
config();

const sendEmailToVerifyRouter = Router();

sendEmailToVerifyRouter.post("/", async (req, res) => {

    //check for token

    if (!req.headers.authorization) {
        return res.status(400).json({ message: "Token is required" });
    }

    //verify token

    const decode = jwtVerify(req.headers.authorization.split(" ")[1]);

    if (decode instanceof Error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    //fetch email from user_id

    try {
        const email = await getEmailFromUserID(decode.user_id)

        if (!email) {
            return res.status(404).json({ message: "Email not found" });
        }

        //generate verify token

        const verifyToken = emailVerifyTokenJWT(decode.user_id, email);


        // add verify token to link

        const link = `http://localhost:3000/verify/${verifyToken}`;

        //send email to user
        const resendClient = await resend();

        const emailResponse = await resendClient.emails.send({

            from:process.env.RESEND_EMAIL_ID,
            to:email,
            subject:"Verify your email",
            html:`<a href="${link}">Click here to verify your email</a>`

        });

        console.group(emailResponse)

        if (emailResponse.error) {
            return res.status(500).json({ message: "Internal server error" });
        }






        return res.status(200).json({ message: "Email sent successfully" });
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal server error" });
        
    }


});

export default sendEmailToVerifyRouter;

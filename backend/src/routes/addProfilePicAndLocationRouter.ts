//addProfilePicAndLocationRouter.ts

import { Router } from "express";
import jwtVerify from "../jwt/jwtVerify.js";
import zod from "zod";
import cloudinary from "../cloudnary/cloudnary.js";

import os from "os";
import multer from "multer";
import addLocationAndProfilePicUrl from "../db/addLocationAndProfilePicUrl.js";

//get the temporary directory for storing files

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const addProfilePicAndLocationRouter = Router();

addProfilePicAndLocationRouter.post(
  "/",

  multer({ storage: storage }).single("profilePic"),

  //   multer().array("profilePic", 1),
  async (req, res) => {
    //check for profile picture , location and token

    console.log(req.file)
    console.log(req.body)

    if (
      !req.file ||
      !(req.file.fieldname === "profilePic") ||
      !req.body.location ||
      !req.headers.authorization
    ) {
      return res
        .status(400)
        .json({ message: "Profile picture, location and token are required" });
    }

    //verify token
    const decode = jwtVerify(req.headers.authorization.split(" ")[1]);

    console.log(decode);

    if (decode instanceof Error) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //validate profile picture as  input file and location as string

    const MAX_FILE_SIZE = 5000000;
    const ACCEPTED_IMAGE_TYPES = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    const schema = zod.object({
      location: zod.string(),
    });

    try {
      schema.parse(req.body);
    } catch (error) {
      return res.status(400).json({ message: "Invalid input" });
    }

    //upload profile picture to cloudinary

    const cr = await cloudinary.v2.uploader.upload(
      req.file.path,
      { folder: "profile-pictures" },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Internal server error" });
        }
      }
    );

    console.log(cr);

    //save profile picture and location to database

    try {
      const insertProfilePicAndLocation = await addLocationAndProfilePicUrl(
        cr.secure_url,
        req.body.location,
        decode.user_id
      );

      if (insertProfilePicAndLocation) {
        return res
          .status(200)
          .json({ message: "Profile picture and location added successfully" });
      }

      return res.status(500).json({ message: "Internal server error" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default addProfilePicAndLocationRouter;

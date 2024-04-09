import { Router } from "express";
import zod from "zod";
import checkIfEmailAndUserNamePresent from "../db/checkIfEmailAndUserNamePresent.js";
import bcrypt from "bcrypt";
import createNewUser from "../db/createNewUser.js";
import createJWTForLogin from "../jwt/createJWTForLogin.js";

const createNewUserRouter = Router();

createNewUserRouter.post("/", async (req, res) => {
  const schema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
    username: zod.string().min(6),
  });

  if (!schema.safeParse(req.body).success) {
    return res.status(400).json({ error: "Please Fill the form Correctly" });
  }

  const name = schema.parse(req.body).name;
  const email = schema.parse(req.body).email;
  const password = schema.parse(req.body).password;
  const username = schema.parse(req.body).username;

  //check if email and username already present

  try {
    const emailAndUserNamePresent = await checkIfEmailAndUserNamePresent(
      email,
      username
    );

    if (emailAndUserNamePresent.emailPresent) {
      return res.status(400).json({ error: "Email already present" });
    }

    if (emailAndUserNamePresent.usernamePresent) {
      return res.status(400).json({ error: "Username already present" });
    }

    //hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user

    const qres = await createNewUser(name, email, hashedPassword, username);

    //get the user_id

    const user_id = qres.rows[0].user_id;

    //generate a jwt token

    const token = createJWTForLogin(user_id);

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error creating new user", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default createNewUserRouter;

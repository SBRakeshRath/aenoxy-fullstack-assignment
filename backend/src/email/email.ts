import { Resend } from "resend";
import { config } from "dotenv";
config();

console.log(process.env.RESEND_EMAIL_SECRET);

const resend = async () => {
  if (!process.env.RESEND_EMAIL_SECRET) {
    throw new Error("RESEND_EMAIL_SECRET is not defined");
  }
  const resend = new Resend(process.env.RESEND_EMAIL_SECRET);
  return resend;
};

export default resend;

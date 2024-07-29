import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

interface SendEmailPropsType {
  email: string;
  emailType: string;
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailPropsType) => {
  try {
    // Generate a hashed token for verification or password reset
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update the user's record in the database based on the email type
    if (emailType === "VERIFY-EMAIL") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 240000, // 4 minutes expiry
      });
    } else if (emailType === "RESET-PASSWORD") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 2400000, // 40 minutes expiry
      });
    }

    // Set up the Nodemailer transport using Mailtrap
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });


    // Configure the email options
    const mailOptions = {
      from: "workflo30072024@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY-EMAIL"
          ? "Verify Your Email"
          : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY-EMAIL"
          ? "verify your email."
          : "reset your password."
      } or copy and paste the link in your browser:<br/>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    };


    // Send the email
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.error("Error in sendEmail:", error);
    throw new Error(error.message);
  }
};

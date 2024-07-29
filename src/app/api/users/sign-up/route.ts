import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    if (password.length < 8) {
      return NextResponse.json({
        message: "Password should be at least 8 characters",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          message: "User already exists",
          success: false,
        },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Send an email for email verification

    await sendEmail({ email, emailType: "VERIFY-EMAIL", userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

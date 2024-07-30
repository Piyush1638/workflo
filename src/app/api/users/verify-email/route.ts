import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    if (!token) {
      console.error("Token is missing from request body");
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

    if (!user) {
      console.error("No user found with the provided token or token is expired");
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true
    });

  } catch (error: any) {
    console.error("Error in verifying email:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

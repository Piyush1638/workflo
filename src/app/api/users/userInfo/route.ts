// route.ts
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { getMyToken } from "@/helpers/getmyToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getMyToken(request);
    if (!userId) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "User Found!",
      success: true,
      user: user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

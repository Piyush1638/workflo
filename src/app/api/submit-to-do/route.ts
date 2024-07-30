import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      title,
      description,
      category,
      priority,
      deadline,
      customProperties,
      userId,
    } = reqBody;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: 404,
        body: {
          error: "User not found",
        },
      });
    }

    user.todos.push({
      title,
      description,
      category,
      priority,
      deadline: deadline ? new Date(deadline) : undefined,
      customProperties,
    });

    await user.save();

    return NextResponse.json(
      { message: "Todo added successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: {
        error: error.message,
      },
    });
  }
}

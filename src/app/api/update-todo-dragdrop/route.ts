import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, taskId, category } = reqBody;

    const user = await User.findById(userId).select("todos");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find the index of the todo item
    const todoIndex = user.todos.findIndex(
      (todo: any) => todo._id.toString() === taskId
    );

    if (todoIndex === -1) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    // Update the category of the todo item
    user.todos[todoIndex].category = category;
    user.todos[todoIndex].updatedAt = new Date();

    await user.save();

    return NextResponse.json(
      { message: "Todo updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    throw new Error("Error: ", error);
  }
}

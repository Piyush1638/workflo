import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, taskId, formValues } = reqBody;

    // Fetch the user by ID
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

    // Replace the todo item with new values
    user.todos[todoIndex] = {
      ...formValues,
      _id: user.todos[todoIndex]._id, // Keep the existing _id
      createdAt: user.todos[todoIndex].createdAt, // Keep the existing createdAt
    };

    // Save the updated user document
    await user.save();

    return NextResponse.json(
      { message: "Todo updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

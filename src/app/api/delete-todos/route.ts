import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { cardId, userId } = reqBody;

    const user = await User.findById(userId).select("todos");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const todoIndex = user.todos.findIndex(
      (todo: any) => todo._id.toString() === cardId
    );

    if (todoIndex === -1) {
      return NextResponse.json(
        { error: "Todo item not found" },
        { status: 404 }
      );
    }

    // Remove the todo item from the array
    user.todos.splice(todoIndex, 1);

    // Save the updated user document
    await user.save();

    return NextResponse.json(
      {
        message: "Todo item deleted successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    const user = await User.findById(userId).select("todos");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Filter todos based on categories
    const categories = ['To Do', 'In Progress', 'Under Review', 'Finished'];
    const categorizedTodos = categories.reduce((acc, category) => {
      acc[category] = user.todos.filter((todo : any) => todo.category === category);
      return acc;
    }, {} as Record<string, typeof user.todos>);

    return NextResponse.json({
      success: true,
      todos: categorizedTodos
    });
  } catch (error: any) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

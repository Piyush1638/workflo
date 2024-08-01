"use client";

import React, { useState } from "react";
import Card from "../cards/Card";
import Image from "next/image";
import AddNewButton from "../AddNewButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "axios";
import { setTodosUpdated } from "@/lib/features/todoSlice";
import { DragProps, dragTask } from "@/helpers/dragFunctions";

interface TodoColumnProps {
  status: TodoStatus;
  title: string;
  buttonText: string;
  bgColorAndFont: string;
  userId: string;
}

type TodoStatus = "To Do" | "In Progress" | "Under Review" | "Finished";
type SortMode = "priority" | "createdAt" | "deadline";

const priorityOrder = ["Urgent", "Medium", "Low", ""];

const TodoColumn: React.FC<TodoColumnProps> = ({
  status,
  title,
  buttonText,
  bgColorAndFont,
  userId,
}) => {
  const [sortMode, setSortMode] = useState<SortMode>("priority");
  const dispatch = useDispatch();

  const todos = useSelector((state: RootState) => state.todos[status]);
  const searchQuery = useSelector((state: RootState) => state.search.query.toLowerCase());

  const filterTodos = (todos: any[]) => 
    todos.filter(todo => 
      todo.title.toLowerCase().includes(searchQuery) ||
      todo.description?.toLowerCase().includes(searchQuery)
    );

  const sortTodos = (a: any, b: any) => {
    switch (sortMode) {
      case "priority":
        return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
      case "createdAt":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "deadline":
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      default:
        return 0;
    }
  };

  const sortedTodos = filterTodos(todos).sort(sortTodos);

  const handleSortButtonClick = (mode: SortMode) => setSortMode(mode);

  const updateCategoryAfterDragNDrop = async (userId: string, category: string) => {
    if (category === dragTask.category) return;
    try {
      await axios.post("/api/update-todo-dragdrop", {
        userId,
        taskId: dragTask._id,
        category,
      });
    } catch (error: any) {
      console.error("Error updating todo category:", error.response?.data);
    }
  };

  const handleOnDrop = async ({ e, userId }: DragProps) => {
    e.preventDefault();
    const status = e.currentTarget.getAttribute("data-status");
    
    if (status && userId) {
      await updateCategoryAfterDragNDrop(userId, status);
      dispatch(setTodosUpdated(true));
    } else {
      console.error("No status found for drop target or userId is undefined");
    }
  };

  return (
    <div
      data-status={status}
      onDrop={(e) => handleOnDrop({ e, userId })}
      onDragOver={(e) => e.preventDefault()}
      className="flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-[#555555] dark:text-slate-300 text-xl">{title}</h3>
        <Popover>
          <PopoverTrigger>
            <div className="dark:bg-gray-800 rounded-md dark:px-0.5">
              <Image src={"/svg/more.svg"} alt="Sort" height={24} width={24} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-1">
            <div className="flex flex-col gap-2 text-start">
              <h3 className="font-semibold px-1">Sort</h3>
              <hr />
              <button
                className="hover:bg-gray-200 dark:hover:bg-[#404040] p-1 rounded-md"
                onClick={() => handleSortButtonClick("priority")}
              >
                By Priority
              </button>
              <button
                className="hover:bg-gray-200 dark:hover:bg-[#404040] p-1 rounded-md"
                onClick={() => handleSortButtonClick("createdAt")}
              >
                Recent
              </button>
              <button
                className="hover:bg-gray-200 dark:hover:bg-[#404040] p-1 rounded-md"
                onClick={() => handleSortButtonClick("deadline")}
              >
                By Deadline
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-4">
        {sortedTodos.length > 0 ? (
          sortedTodos.map((item: any, index: number) => <Card props={item} key={index} />)
        ) : searchQuery.length > 0 ? (
          <p className="text-gray-600 dark:text-gray-200">No tasks match your search criteria.</p>
        ) : null}
      </div>
      <AddNewButton
        buttonText={buttonText}
        status={status}
        bgColorAndFont={bgColorAndFont}
      />
    </div>
  );
};

export default TodoColumn;

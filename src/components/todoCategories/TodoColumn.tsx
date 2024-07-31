"use client";

import React, { useState } from "react";
import Card from "../cards/Card";
import Image from "next/image";
import AddNewButton from "../AddNewButton";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { handleOnDragOver, handleOnDrop } from "@/helpers/dragFunctions";

interface TodoColumnProps {
  status: string;
  title: string;
  buttonText: string;
  bgColorAndFont: string;
  userId: string;
}

type TodoStatus = "To Do" | "In Progress" | "Under Review" | "Finished";
type SortMode = "priority" | "createdAt" | "deadline";

const TodoColumn: React.FC<TodoColumnProps> = ({
  status,
  title,
  buttonText,
  bgColorAndFont,
  userId,
}) => {
  const [sortMode, setSortMode] = useState<SortMode>("priority");
  const [onDropEnter, setOnDropEnter] = useState(false);

  const todos = useSelector(
    (state: RootState) => state.todos[status as TodoStatus]
  );
  const searchQuery = useSelector(
    (state: { search: { query: string } }) => state.search.query
  );

  // Filter todos based on search query
  const filteredTodos = todos.filter(
    (todo: any) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting logic
  const sortTodos = (a: any, b: any) => {
    if (sortMode === "priority") {
      const priorityOrder = ["Urgent", "Medium", "Low", ""];
      return (
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
      );
    } else if (sortMode === "createdAt") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortMode === "deadline") {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return 0;
  };

  // Apply sorting
  const sortedTodos = filteredTodos.sort(sortTodos);

  const handleSortButtonClick = (mode: SortMode) => {
    setSortMode(mode);
  };

  const showNoResultsMessage =
    searchQuery.length > 0 && filteredTodos.length === 0;

  return (
    <div
      data-status={status}
      onDrop={(e) => handleOnDrop({ e, userId })}
      onDragOver={(e) => handleOnDragOver(e)}
      className="flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-[#555555] dark:text-slate-300 text-xl">{title}</h3>
        <Popover>
          <PopoverTrigger className="">
            <div className="dark:bg-gray-800 rounded-md dark:px-0.5">
              <Image src={"/svg/more.svg"} alt="Sort" height={24} width={24} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-1">
            <div className="flex flex-col gap-2 justify-start text-start">
              <h3 className="font-semibold font-barlow px-1">Sort</h3>
              <hr />
              <button
                className="text-start hover:bg-gray-200 dark:hover:bg-[#404040] p-1 rounded-md "
                onClick={() => handleSortButtonClick("priority")}
              >
                By Priority
              </button>
              <button
                className="text-start hover:bg-gray-200 dark:hover:bg-[#404040] p-1 rounded-md "
                onClick={() => handleSortButtonClick("createdAt")}
              >
                Recent
              </button>
              <button
                className="text-start hover:bg-gray-200 dark:hover:bg-[#404040] p-1 rounded-md "
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
          sortedTodos.map((item: any, index: number) => (
            <Card props={item} key={index} />
          ))
        ) : showNoResultsMessage ? (
          <p className="text-gray-600 dark:text-gray-200">
            No tasks match your search criteria.
          </p>
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

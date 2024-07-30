"use client";

import React from "react";
import Card from "../cards/Card";
import Image from "next/image";
import AddNewButton from "../AddNewButton";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

interface TodoColumnProps {
  status: string;
  title: string;
  buttonText: string;
  bgColorAndFont: string;
}

type TodoStatus = "To Do" | "In Progress" | "Under Review" | "Finished";


const TodoColumn: React.FC<TodoColumnProps> = ({ status, title, buttonText, bgColorAndFont }) => {
  const todos = useSelector((state: RootState) => state.todos[status as TodoStatus]);
  const searchQuery = useSelector((state: { search: { query: string } }) => state.search.query);

  // Filter todos based on search query
  const filteredTodos = todos.filter((todo: any) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showNoResultsMessage = searchQuery.length > 0 && filteredTodos.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <h3 className="text-[#555555] text-xl">{title}</h3>
        <button>
          <Image src={"/svg/more.svg"} alt="" height={24} width={24} />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((item: any, index: number) => (
            <Card props={item} key={index} />
          ))
        ) : showNoResultsMessage ? (
          <p className="text-gray-600">No tasks match your search criteria.</p>
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

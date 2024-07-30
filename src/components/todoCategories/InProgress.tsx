"use client";

import React from "react";
import Card from "../cards/Card";
import Image from "next/image";
import AddNewButton from "../AddNewButton";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const InProgress = () => {
  const userInProgressTodo = useSelector(
    (state: RootState) => state.todos["In Progress"]
  );
  const searchQuery = useSelector((state: { search: { query: string } }) => state.search.query);

  // Filter todos based on search query
  const filteredTodos = userInProgressTodo.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showNoResultsMessage = searchQuery.length > 0 && filteredTodos.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <h3 className="text-[#555555] text-xl">In Progress</h3>
        <button>
          <Image src={"/svg/more.svg"} alt="" height={24} width={24} />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((item, index) => (
            <Card props={item} key={index} />
          ))
        ) : showNoResultsMessage ? (
          <p className="text-gray-600">No tasks match your search criteria.</p>
        ) : null}
      </div>
      <AddNewButton
        buttonText={"Add New"}
        status={"In Progress"}
        bgColorAndFont="bg-gradient-to-t from-[#202020] to-[#3A3A3A] justify-between"
      />
    </div>
  );
};

export default InProgress;

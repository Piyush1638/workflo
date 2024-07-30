"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import AddNewButton from "../AddNewButton";
import Card from "../cards/Card";

const Finished = () => {
  const userFinishedTodo = useSelector(
    (state: RootState) => state.todos["Finished"]
  );
  const searchQuery = useSelector((state: { search: { query: string } }) => state.search.query);

  // Filter todos based on search query
  const filteredTodos = userFinishedTodo.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showNoResultsMessage = searchQuery.length > 0 && filteredTodos.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <h3 className="text-[#555555] text-xl">Finished</h3>
        <button>
          <Image src={"/svg/more.svg"} alt="" height={24} width={24} />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((item, index) => (
            <React.Fragment key={index}>
              <Card props={item} />
            </React.Fragment>
          ))
        ) : showNoResultsMessage ? (
          <p className="text-gray-600">No tasks match your search criteria.</p>
        ) : null}
      </div>
      <AddNewButton
        buttonText={"Add New"}
        status={"Finished"}
        bgColorAndFont="bg-gradient-to-t from-[#202020] to-[#3A3A3A] justify-between"
      />
    </div>
  );
};

export default Finished;

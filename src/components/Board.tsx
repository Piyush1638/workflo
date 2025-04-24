"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import axios from "axios";
import { setTodos, setTodosUpdated } from "@/lib/features/todoSlice";
import Loading from "./Loading";
import TodoColumn from "./todoCategories/TodoColumn";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const todosUpdated = useSelector(
    (state: RootState) => state.todos.todosUpdated
  );
  const userInfo = useSelector((state: RootState) => state.userInfo);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!userInfo || !userInfo.id) return;

      setLoading(true);
      try {
        const res = await axios.post("/api/fetch-todos", {
          userId: userInfo.id,
        });
        dispatch(setTodos(res.data.todos));
      } catch (error: any) {
        setError("Error fetching todos. Please try again.");
        console.error(
          "Error fetching todos:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [userInfo, dispatch, todosUpdated]);

  useEffect(() => {
    if (todosUpdated) {
      dispatch(setTodosUpdated(false));
    }
  }, [todosUpdated, dispatch]);

  const isTodosEmpty =
    todos["To Do"].length === 0 &&
    todos["In Progress"].length === 0 &&
    todos["Under Review"].length === 0 &&
    todos["Finished"].length === 0;

  return (
    <section className="p-4 overflow-y-auto  gap-4 flex flex-col">
      <div
        className={`rounded-[0.5rem] p-4 ${
          isTodosEmpty ? "flex items-center justify-center" : "grid"
        } grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4 w-full bg-[#FFFFFF] dark:bg-[#404040]`}
      >
        {loading ? (
          <Loading />
        ) : isTodosEmpty ? (
          <div className="w-full h-full text-center dark:text-white">
            <h3 className="text-xl font-barlow font-semibold mb-4">
              No tasks created yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              It looks like you haven&apos;t created any tasks. Get started by
              adding your first task and stay organized!
            </p>
          </div>
        ) : (
          <>
            <TodoColumn
              status="To Do"
              title="To Do"
              buttonText="Add New"
              userId={userInfo.id}
              bgColorAndFont="bg-gradient-to-t from-[#202020] to-[#3A3A3A] dark:from-gray-500 dark:to-gray-300  justify-between"
            />
            <TodoColumn
              status="In Progress"
              title="In Progress"
              buttonText="Add New"
              userId={userInfo.id}
              bgColorAndFont="bg-gradient-to-t from-[#202020] to-[#3A3A3A] dark:from-gray-500 dark:to-gray-300 justify-between"
            />
            <TodoColumn
              status="Under Review"
              title="Under Review"
              buttonText="Add New"
              userId={userInfo.id}
              bgColorAndFont="bg-gradient-to-t from-[#202020] to-[#3A3A3A] dark:from-gray-500 dark:to-gray-300 justify-between"
            />
            <TodoColumn
              status="Finished"
              title="Finished"
              buttonText="Add New"
              userId={userInfo.id}
              bgColorAndFont="bg-gradient-to-t from-[#202020] to-[#3A3A3A] dark:from-gray-500 dark:to-gray-300 justify-between"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Board;

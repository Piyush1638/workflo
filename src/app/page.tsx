"use client";

import GreetingsForms from "@/components/GreetingsForms";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { setTodos, setTodosUpdated } from "@/lib/features/todoSlice";
import { setUserInfo } from "@/lib/features/userInfoSlice";
import type { AppDispatch } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo, TodoState } from "@/lib/interfaces/interfaces";
import Loading from "@/components/Loading";
import TodoColumn from "@/components/todoCategories/TodoColumn";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const userInfo = useSelector(
    (state: { userInfo: UserInfo }) => state.userInfo
  );
  const todos = useSelector((state: { todos: TodoState }) => state.todos);
  const todosUpdated = useSelector(
    (state: { todos: TodoState }) => state.todos.todosUpdated
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("/api/users/userInfo");
        const { name, email, _id: id } = res.data.user;
        if (id) {
          dispatch(setUserInfo({ name, email, id }));
        } else {
          console.error("Invalid user ID received:", id);
        }
      } catch (error: any) {
        setError("Error fetching user info. Please try again.");
        console.error(
          "Error fetching user info:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [dispatch]);

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

  if (error) return <div className="text-red-500">{error}</div>;

  const isTodosEmpty =
    todos["To Do"].length === 0 &&
    todos["In Progress"].length === 0 &&
    todos["Under Review"].length === 0 &&
    todos["Finished"].length === 0;

  return (
    <main className="flex min-h-screen bg-[#f7f7f7] dark:bg-black">
      <Sidebar userInfo={userInfo} />
      <section className="p-4 overflow-y-auto ml-64 gap-4 flex flex-col">
        <GreetingsForms />
          <div
            className={`rounded-[0.5rem] p-4 ${
              isTodosEmpty ? "flex items-center justify-center" : "grid"
            } grid-cols-4 gap-4 w-full bg-[#FFFFFF] dark:bg-[#404040]`}
          >
            {loading ? (
              <Loading />
            ) : isTodosEmpty ? (
              <div className="w-full h-full text-center dark:text-white">
                <h3 className="text-xl font-barlow font-semibold mb-4">
                  No tasks created yet
                </h3>
                <p className="text-gray-600">
                  It looks like you haven&apos;t created any tasks. Get started
                  by adding your first task and stay organized!
                </p>
              </div>
            ) : (
              <>
                <TodoColumn
                  status="To Do"
                  title="To Do"
                  buttonText="Add New"
                  bgColorAndFont="bg-gradient-to-t from-[#202020] to-[#3A3A3A] dark:from-gray-500 dark:to-gray-300  justify-between"
                  userId={userInfo.id}
                />
                <TodoColumn
                  status="In Progress"
                  title="In Progress"
                  buttonText="Add New"
                  bgColorAndFont="bg-gradient-to-t from-[#202020] to-[#3A3A3A] dark:from-gray-500 dark:to-gray-300 justify-between"
                  userId={userInfo.id}
                />
                <TodoColumn
                  status="Under Review"
                  title="Under Review"
                  buttonText="Add New"
                  bgColorAndFont="bg-gradient-to-t from-[#202020] to-[#3A3A3A] dark:from-gray-500 dark:to-gray-300 justify-between"
                  userId={userInfo.id}
                />
                <TodoColumn
                  status="Finished"
                  title="Finished"
                  buttonText="Add New"
                  bgColorAndFont="bg-gradient-to-t from-[#202020] to-[#3A3A3A] dark:from-gray-500 dark:to-gray-300 justify-between"
                  userId={userInfo.id}
                />
              </>
            )}
          </div>
      </section>
    </main>
  );
};

export default Home;

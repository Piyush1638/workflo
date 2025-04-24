"use client";

import GreetingsForms from "@/components/GreetingsForms";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { setTodosUpdated } from "@/lib/features/todoSlice";
import { setUserInfo } from "@/lib/features/userInfoSlice";
import type { AppDispatch } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo, TodoState } from "@/lib/interfaces/interfaces";
import Board from "@/components/Board";
import ResponsiveAside from "@/components/ResponsiveAside";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const userInfo = useSelector(
    (state: { userInfo: UserInfo }) => state.userInfo
  );
  const todosUpdated = useSelector(
    (state: { todos: TodoState }) => state.todos.todosUpdated
  );
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
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  useEffect(() => {
    if (todosUpdated) {
      dispatch(setTodosUpdated(false));
    }
  }, [todosUpdated, dispatch]);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <main className="flex min-h-screen bg-[#f7f7f7] dark:bg-black">
      <div className="lg:flex hidden">
        <Sidebar userInfo={userInfo} />
      </div>
      <section className="w-full h-full">
        <div className="lg:hidden flex w-full items-start justify-start">
          <ResponsiveAside userInfo={userInfo} />
        </div>
        <div className="p-4 overflow-y-auto lg:ml-64 gap-4 flex flex-col">
          <GreetingsForms />
          {userInfo ? (
            <Board />
          ) : (
            <div className="text-center">No user info available</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;

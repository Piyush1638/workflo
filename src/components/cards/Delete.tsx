"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { Props } from "@/lib/interfaces/interfaces";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setTodosUpdated } from "@/lib/features/todoSlice"; // Import your action

interface Data {
  userInfo: {
    id: string;
  };
}

const Delete: React.FC<Props> = ({ props }) => {
  const userName = useSelector((data: Data) => data.userInfo.id);
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Track dialog visibility

  const userIdCardId = {
    userId: userName,
    cardId: props._id,
  };

  const DeleteTodo = async () => {
    try {
      const response = await axios.post("/api/delete-todos", userIdCardId);
      if (response.data.success) {
        setSuccessMessage("Task Deleted Successfully");
        dispatch(setTodosUpdated(true)); // Dispatch action to update global state
        // Optionally, you can fetch todos again if needed
        // fetchTodos();
      }
    } catch (error) {
      console.log("Error in deleting: ", error);
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger>
        <Image
          src={"/png/delete.png"}
          alt="Delete icon"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {successMessage ? successMessage : "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {successMessage
              ? ""
              : "This action cannot be undone. This will permanently delete this task and remove it from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {successMessage ? (
            <AlertDialogCancel>Close</AlertDialogCancel>
          ) : (
            <>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={DeleteTodo}
                className="bg-red-400 hover:bg-red-400"
              >
                Continue
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;

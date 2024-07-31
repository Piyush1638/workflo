"use client";
import { CardProps } from "@/lib/interfaces/interfaces";
import axios from "axios";

export interface DragProps {
  e: React.DragEvent<HTMLDivElement>;
  props?: CardProps;
  userId?: string;
}

let dragTask: any;

const updateCategoryAfterDragNDrop = async ({
  userId,
  category,
}: {
  userId: string;
  category: string;
}) => {
  try {
    const res = await axios.post("/api/update-todo-dragdrop", {
      userId,
      taskId: dragTask._id,
      category,
    });
  } catch (error: any) {
    console.error("Error updating todo category:", error.response.data);
  }
};

export const handleDrag = ({ props }: DragProps) => {
  dragTask = props;
};

export const handleOnDrop = ({ e, userId }: DragProps) => {
  e.preventDefault();
  const status = e.currentTarget.getAttribute("data-status");
  if (status) {
    // Update the category of the task
    updateCategoryAfterDragNDrop({
      userId: userId as string,
      category: status,
    });
  } else {
    console.error("No status found for drop target");
  }
};

export const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};

"use client";
import React, { useState } from "react";
import { Props } from "@/lib/interfaces/interfaces";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Field from "../Field";
import axios from "axios";
import { setTodosUpdated } from "@/lib/features/todoSlice"; // Import the action

interface Data {
  userInfo: {
    id: string;
  };
}

const EditForm: React.FC<Props> = ({ props }) => {
  const dispatch = useDispatch();
  const userId = useSelector((data: Data) => data.userInfo.id);
  const [formValues, setFormValues] = useState({
    title: props.title,
    category: props.category,
    priority: props.priority,
    deadline: props.deadline,
    description: props.description,
    customProperties: Object.entries(props.customProperties || {}).map(([key, value]) => ({ key, value })),
  });
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  const userTaskInfo = {
    userId,
    taskId: props._id,
    formValues,
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleCustomPropertyChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updatedProperties = [...formValues.customProperties];
    const property = updatedProperties[index];
    
    if (field === "key") {
      const existingValue = property.value;
      updatedProperties[index] = { key: value, value: existingValue };
    } else {
      updatedProperties[index] = { key: property.key, value };
    }

    setFormValues({ ...formValues, customProperties: updatedProperties });
  };

  const handleAddCustomProperty = () => {
    setFormValues({
      ...formValues,
      customProperties: [
        ...formValues.customProperties,
        { key: "", value: "" },
      ],
    });
  };

  const handleRemoveCustomProperty = (index: number) => {
    const updatedProperties = formValues.customProperties.filter((_, i) => i !== index);
    setFormValues({ ...formValues, customProperties: updatedProperties });
  };

  const updateTask = async () => {
    try {
      const formValuesWithMap = {
        ...formValues,
        customProperties: formValues.customProperties.reduce((acc, prop) => {
          acc[prop.key] = prop.value;
          return acc;
        }, {} as Record<string, string>),
      };
  
      const userTaskInfoWithMap = {
        userId,
        taskId: props._id,
        formValues: formValuesWithMap,
      };
  
      const response = await axios.post("/api/update-todos", userTaskInfoWithMap);
      console.log(response);
      setUpdateStatus("Task updated successfully!");
      dispatch(setTodosUpdated(true)); // Dispatch action to update global state
    } catch (error: any) {
      console.error("Error updating task:", error.response?.data || error.message || error);
      setUpdateStatus("Error updating task.");
    }
  };
  

  return (
    <Dialog>
      <DialogTrigger className="dark:bg-gray-700 dark:p-0.5 rounded-md">
        <Image
          src={"/png/edit.png"}
          alt="Edit icon"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="bg-[#f7f7f7] dark:bg-[#404040] min-w-fit p-6 rounded-[1rem]">
        <DialogHeader className="mt-6 mb-4">
          <DialogTitle>
            <input
              type="text"
              value={formValues.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              className="text-5xl font-semibold bg-transparent outline-none border-none w-full"
              placeholder="Title"
            />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Field
            iconSrc="/svg/Dialog/status.svg"
            label="Status"
            value={formValues.category}
            onChange={(value) => handleFieldChange("category", value)}
          />
          <Field
            iconSrc="/svg/Dialog/priority.svg"
            label="Priority"
            value={formValues.priority}
            onChange={(value) => handleFieldChange("priority", value)}
          />
          <Field
            iconSrc="/svg/Dialog/deadline.svg"
            label="Deadline"
            value={formValues.deadline}
            onChange={(value) => handleFieldChange("deadline", value)}
          />
          <Field
            iconSrc="/svg/Dialog/description.svg"
            label="Description"
            value={formValues.description}
            onChange={(value) => handleFieldChange("description", value)}
          />

          {formValues.customProperties.map((property, index) => (
            <div key={index} className="flex gap-4 mb-4 items-center">
              <input
                type="text"
                className="border border-gray-300 rounded p-2 outline-none"
                placeholder="Key"
                value={property.key}
                onChange={(e) =>
                  handleCustomPropertyChange(index, "key", e.target.value)
                }
              />
              <input
                type="text"
                className="border border-gray-300 rounded p-2 outline-none"
                placeholder="Value"
                value={property.value}
                onChange={(e) =>
                  handleCustomPropertyChange(index, "value", e.target.value)
                }
              />
              <button
                className="text-red-500 text-3xl font-bold"
                onClick={() => handleRemoveCustomProperty(index)}
              >
                X
              </button>
            </div>
          ))}

          <button
            className="flex items-center text-blue-500 mt-2"
            onClick={handleAddCustomProperty}
          >
            <Image
              src="/svg/Dialog/add-new.svg"
              alt="Add"
              height={24}
              width={24}
            />
            <span className="ml-2">Add custom property</span>
          </button>

          <button onClick={updateTask} className="mt-6 bg-blue-500 text-white p-2 rounded">
            Update
          </button>

          {updateStatus && (
            <div className={`mt-4 text-${updateStatus === "Task updated successfully!" ? "green" : "red"}-500`}>
              {updateStatus}
            </div>
          )}
        </div>
        <div className="mt-6 text-sm text-gray-400">
          Start writing, or drag your own files here.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditForm;

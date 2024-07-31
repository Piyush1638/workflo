"use client";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CustomProperty, Data, Fields } from "@/lib/interfaces/interfaces";
import Field from "./Field";
import { setTodosUpdated } from "@/lib/features/todoSlice"; // Import the action

const AddNewButton: React.FC<{
  buttonText: string;
  bgColorAndFont: string;
  status: string;
}> = ({ buttonText, bgColorAndFont, status }) => {
  const userId = useSelector((data: Data) => data.userInfo.id);
  const dispatch = useDispatch(); // Initialize dispatch
  const [customProperties, setCustomProperties] = useState<CustomProperty[]>([]);
  const [fields, setFields] = useState<Fields>({
    Title: "",
    Category: status || "", // Set the initial status
    Priority: "",
    Deadline: "",
    Description: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<{ title: boolean; status: boolean }>({
    title: false,
    status: false,
  });

  const handleAddCustomProperty = () => {
    setCustomProperties([...customProperties, { key: "", value: "" }]);
  };

  const handleCustomPropertyChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newProperties = [...customProperties];
    newProperties[index] = { ...newProperties[index], [field]: value };
    setCustomProperties(newProperties);
  };

  const handleRemoveCustomProperty = (index: number) => {
    setCustomProperties(customProperties.filter((_, i) => i !== index));
  };

  const handleFieldChange = (field: keyof Fields, value: string) => {
    setFields({ ...fields, [field]: value });
  };

  const handleSubmit = async () => {
    // Check for required fields (excluding priority)
    if (!fields.Title || !fields.Category) {
      setError({
        title: !fields.Title,
        status: !fields.Category,
      });
      return;
    }
  
    const todoData = {
      title: fields.Title,
      description: fields.Description,
      category: fields.Category,
      priority: fields.Priority || "", // Set to empty string if not provided
      deadline: fields.Deadline,
      customProperties: customProperties.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {} as { [key: string]: string }),
      userId: userId,
    };
  
    try {
      await axios.post("/api/submit-to-do", todoData);
      dispatch(setTodosUpdated(true)); // Dispatch action to update todosUpdated
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={`flex items-center ${bgColorAndFont} p-2 rounded-[8px] text-white  shadow-md shadow-gray-400`}
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
        <Image
          src={"/svg/create-new.svg"}
          alt="Create new"
          height={24}
          width={24}
        />
      </DialogTrigger>
      <DialogContent className="bg-[#f7f7f7] dark:bg-[#404040] min-w-fit p-6 rounded-[1rem]">
        <DialogHeader className="mt-6 mb-4">
          <DialogTitle>
            <input
              type="text"
              value={fields.Title}
              onChange={(event) =>
                handleFieldChange("Title", event.target.value)
              }
              className="text-5xl font-semibold bg-transparent outline-none border-none w-full"
              placeholder="Title"
            />
            {error.title && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Field
            iconSrc="/svg/Dialog/status.svg"
            label="Status"
            value={fields.Category}
            onChange={(value) => handleFieldChange("Category", value)}
          />
          {error.status && (
            <p className="text-red-500 text-sm">Status is required</p>
          )}
          <Field
            iconSrc="/svg/Dialog/priority.svg"
            label="Priority"
            value={fields.Priority}
            onChange={(value) => handleFieldChange("Priority", value)}
          />
          <Field
            iconSrc="/svg/Dialog/deadline.svg"
            label="Deadline"
            value={fields.Deadline}
            onChange={(value) => handleFieldChange("Deadline", value)}
          />
          <Field
            iconSrc="/svg/Dialog/description.svg"
            label="Description"
            value={fields.Description}
            onChange={(value) => handleFieldChange("Description", value)}
          />

          {customProperties.map((property, index) => (
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

          <button
            className="mt-6 bg-blue-500 text-white p-2 rounded"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
        <div className="mt-6 text-sm text-gray-400">
          Start writing, or drag your own files here.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewButton;

"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React, { useState } from "react";


const AddNewButton = ({buttonText, bgColorAndFont, status}:{buttonText: string; bgColorAndFont: string; status:string;}) => {
  const [customProperties, setCustomProperties] = useState<string[]>([]);
  const [fields, setFields] = useState<{ [key: string]: string }>({
    Status: "",
    Priority: "",
    Deadline: "",
    Description: "",
  });

  const handleAddCustomProperty = () => {
    setCustomProperties([...customProperties, ""]);
  };

  const handleCustomPropertyChange = (index: number, value: string) => {
    const newProperties = [...customProperties];
    newProperties[index] = value;
    setCustomProperties(newProperties);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFields({ ...fields, [field]: value });
  };

  return (
    <Dialog>
      <DialogTrigger className={`flex items-center ${bgColorAndFont} p-2 rounded-[8px] text-white shadow-md shadow-gray-400`}>
        {buttonText}
        <Image
          src={"/svg/create-new.svg"}
          alt="Create new"
          height={24}
          width={24}
        />
      </DialogTrigger>
      <DialogContent className="bg-[#f7f7f7] min-w-fit p-6 rounded-[1rem]">
        <DialogHeader className="mt-6 mb-4">
          <DialogTitle>
            <input
              type="text"
              className="text-5xl font-semibold bg-transparent outline-none border-none w-full"
              placeholder="Title"
            />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Field
            iconSrc="/svg/Dialog/status.svg"
            label="Status"
            value={status ? status : fields.Status}
            onChange={(value) => handleFieldChange("Status", value)}
          />
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
            <input
              key={index}
              type="text"
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Custom Property"
              value={property}
              onChange={(e) =>
                handleCustomPropertyChange(index, e.target.value)
              }
            />
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
        </div>
        <div className="mt-6 text-sm text-gray-400">
          Start writing, or drag your own files here.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewButton;


interface FieldProps {
  iconSrc: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

const Field: React.FC<FieldProps> = ({ iconSrc, label, value, onChange }) => {
  let inputElement;

  switch (label) {
    case "Status":
      inputElement = (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className=" bg-transparent rounded p-1 w-40"
        >
          <option value="" disabled>
            Not Selected
          </option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Under Review">Under Review</option>
          <option value="Finished">Finished</option>
        </select>
      );
      break;
    case "Priority":
      inputElement = (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent rounded p-1 w-40"
        >
          <option value="" disabled>
            Not Selected
          </option>
          <option value="Urgent">Urgent</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      );
      break;
    case "Deadline":
      inputElement = (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded p-1 bg-transparent outline-none w-40"
        />
      );
      break;
    case "Description":
      inputElement = (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded p-1 w-3/4 outline-none bg-transparent"
          rows={3}
          placeholder="Enter description"
        />
      );
      break;
    default:
      inputElement = (
        <span className="ml-auto text-gray-400">{value || "Not selected"}</span>
      );
      break;
  }

  return (
    <div className="flex items-center justify-start gap-4 mb-4">
      <div className={`flex ${label==="Description" ? "": "items-center"} gap-2 w-52`}>
        <Image src={iconSrc} alt={label} height={24} width={24} />
        <span className="ml-2 text-gray-600">{label}</span>
      </div>
      <>{inputElement}</>
    </div>
  );
};

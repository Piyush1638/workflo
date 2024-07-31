import React from "react";
import Image from "next/image";
import { FieldProps } from "@/lib/interfaces/interfaces";

const Field: React.FC<FieldProps> = ({ iconSrc, label, value, onChange }) => {
  let inputElement;

  switch (label) {
    case "Status":
      inputElement = (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent rounded p-1 w-40 outline-none"
        >
          <option value="" disabled>
            Not Selected
          </option>
          <option value="To Do" className="dark:text-black">To Do</option>
          <option value="In Progress" className="dark:text-black">In Progress</option>
          <option value="Under Review" className="dark:text-black">Under Review</option>
          <option value="Finished" className="dark:text-black">Finished</option>
        </select>
      );
      break;
    case "Priority":
      inputElement = (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent rounded p-1 w-40 outline-none"
        >
          <option value="" disabled>
            Not Selected
          </option>
          <option value="Urgent" className="dark:text-black">Urgent</option>
          <option value="Medium" className="dark:text-black">Medium</option>
          <option value="Low" className="dark:text-black">Low</option>
        </select>
      );
      break;
    case "Deadline":
      inputElement = (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent p-1 w-40 outline-none"
        />
      );
      break;
    default:
      inputElement = (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent p-1 w-full outline-none"
          placeholder={label}
        />
      );
  }

  return (
    <div className="flex items-center justify-start gap-4 mb-4">
      <div className={`flex ${label === "Description" ? "" : "items-center"} gap-2 w-52`}>
        <Image src={iconSrc} alt={label} height={24} width={24} />
        <span className="ml-2 text-gray-600 dark:text-slate-400">{label}</span>
      </div>
      {inputElement}
    </div>
  );
};

export default Field;

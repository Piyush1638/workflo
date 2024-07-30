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
          className="bg-transparent rounded p-1 w-40 outline-none"
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
        <span className="ml-2 text-gray-600">{label}</span>
      </div>
      {inputElement}
    </div>
  );
};

export default Field;

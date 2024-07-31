import { formatDate, formatRelativeTime } from "@/helpers/formatDeadline";
import { Props } from "@/lib/interfaces/interfaces";
import Image from "next/image";
import React from "react";
import Delete from "./Delete";
import EditForm from "./EditForm";
import { handleDrag } from "@/helpers/dragFunctions";



const Card: React.FC<Props> = ({ props }) => {
  const hasCustomProperties =
    props.customProperties && Object.keys(props.customProperties).length > 0;

 

  return (
    <div
      draggable
      onDrag={(e) => handleDrag({e, props})}
      className="task_card cursor-grab px-[13px] py-[14px] flex flex-col gap-4 border border-[#DEDEDE] dark:border-[#404040] rounded-[0.5rem] bg-[#F9F9F9] dark:bg-[#232323]"
    >
      <h3 className="text-[#606060] dark:text-slate-200">{props.title}</h3>
      {props.description && (
        <p className="text-sm text-[#797979] dark:text-slate-300">{props.description}</p>
      )}
      {props.priority && (
        <p
          className={`text-white text-xs w-fit rounded-[0.5rem] px-2 py-[6px] ${
            props.priority === "Urgent"
              ? "bg-[#FF6B6B]"
              : props.priority === "Medium"
              ? "bg-[#FFA235]"
              : "bg-[#0ECC5A]"
          }`}
        >
          {props.priority}
        </p>
      )}

      {/* Render customProperties if there are any */}
      {hasCustomProperties && (
        <div className="text-sm text-[#606060] dark:text-slate-300">
          {Object.entries(props.customProperties!).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <span className="font-semibold">{key}:</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-start gap-2 w-full">
        <Image
          src={"/svg/deadline.svg"}
          alt="Deadline icon"
          height={24}
          width={24}
        />
        <p className="text-sm text-[#606060] dark:text-slate-300">
          {props.deadline ? formatDate(props.deadline) : "No Deadline"}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#797979]">
          {formatRelativeTime(props.createdAt!)}
        </p>
        <div className="flex items-center gap-2">
          <EditForm props={props} />
          <Delete props={props} />
        </div>
      </div>
    </div>
  );
};

export default Card;

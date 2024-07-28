import Image from "next/image";
import React from "react";

interface Props {
  props: {
    title: string;
    status: string;
    priority?: string;
    deadline?: string;
    description?: string;
    [key: string]: any; // Index signature for additional properties
  };
}

const Card: React.FC<Props> = ({ props }) => {
  return (
    <div className="px-[13px] py-[14px] flex flex-col gap-4 border border-[#DEDEDE] rounded-[0.5rem] bg-[#F9F9F9] cursor-grab" draggable>
      <h3 className="text-[#606060]">{props.title}</h3>
      {props.description && <p className="text-sm text-[#797979]">{props.description}</p>}
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

      <div className="flex items-center justify-start gap-2 w-full">
        <Image src={"/svg/deadline.svg"} alt="" height={24} width={24}/>
        <p className="text-sm text-[#606060]">{props.deadline}</p>
      </div>
    </div>
  );
};

export default Card;

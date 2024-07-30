"use client";
import React, { useState } from "react";

const DropArea = ({ onDrop }: { onDrop: any }) => {
  const className =
    "h-[6rem] w-full opacity-100 border border-dashed border-gray-600 rounded-[0.5rem] bg-[#F9F9F9] flex items-center justify-center transition-all ease-in-out duration-200";
  const [showDrop, setShowDrop] = useState(false);
  return (
    <div
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={()=>{
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={e => e.preventDefault()}
      className={`${showDrop ? className : "opacity-0"}`}
    >
      DropArea
    </div>
  );
};

export default DropArea;

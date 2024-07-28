import React from "react";
import Card from "./Card";
import Image from "next/image";
import AddNewButton from "./AddNewButton";

const UnderReview = () => {
  const cardDetails = {
    title: "Design new logo",
    status: "To do",
    priority: "Urgent",
    deadline: "2024-08-25",
    description:
      "Develop and integrate user authentication using email and password.",
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <h3 className="text-[#555555] text-xl">Under Review</h3>
        <button>
          <Image src={"/svg/more.svg"} alt="" height={24} width={24} />
        </button>
      </div>{" "}
      <div className="flex flex-col gap-4">
        <Card props={cardDetails} />
      </div>
      <AddNewButton buttonText={"Add New"} status={"Under Review"} bgColorAndFont="bg-gradient-to-t from-[#202020] to-[#3A3A3A] justify-between"/>
    </div>
  );
};

export default UnderReview;

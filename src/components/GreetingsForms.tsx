"use client";
import Image from "next/image";
import React from "react";
import AddNewButton from "./AddNewButton";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/lib/features/searchSlice";
import HelpFeedback from "./HelpFeedback";

interface Data {
  userInfo: {
    name: string;
  };
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const GreetingsForms = () => {
  const dispatch = useDispatch();
  const userName = useSelector((data: Data) => data.userInfo.name);
  const searchQuery = useSelector(
    (state: { search: { query: string } }) => state.search.query
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex lg:flex-row flex-col gap-4 items-center justify-between w-full">
          <h1 className="flex items-center justify-between font-semibold text-xl sm:text-2xl  md:text-3xl  lg:text-5xl leading-[3.6rem] font-barlow">
            {getGreeting() + ", " + userName}!
          </h1>
          <HelpFeedback />
        </div>
      </div>
      {/* Here is the feature cards */}
      <div className="flex lg:flex-row flex-col gap-2">
        <FeatureCard
          img="/svg/introducing-tags.svg"
          title="Introducing tags"
          description="Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient."
          height={61}
          width={77}
        />
        <FeatureCard
          img="/svg/share-notes-instantly.svg"
          title="Share Notes Instantly"
          description="Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options."
          height={50}
          width={76}
        />
        <FeatureCard
          img="/svg/access-anywhere.svg"
          title="Access Anywhere"
          description="Sync your notes across all devices. Stay productive whether you&nbsp;re on your phone, tablet, or computer."
          height={70}
          width={76}
        />
      </div>

      {/*Here is Search, Calender View, Automation, Filter, Share and Create New*/}
      <div className="flex lg:flex-row flex-col gap-2 justify-between w-full">
        {/* Search */}
        <div className="w-full lg:w-1/3 h-[50px] p-2 flex gap-2 rounded-lg bg-white border border-[#E9E9E9] dark:border-[#404040] dark:bg-[#404040]">
          <input
            type="text"
            className="bg-transparent outline-none w-full"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Image src={"/svg/search.svg"} alt="search" height={24} width={24} />
        </div>

        {/* Other Features */}
        {/* <Functionalities name="Calender View" icon="/svg/calender.svg" />
            <Functionalities name="Automation" icon="/svg/automation.svg" />
            <Functionalities name="Filter" icon="/svg/filter.svg" />
            <Functionalities name="Share" icon="/svg/share.svg" /> */}
        <AddNewButton
          buttonText="Create New"
          status=""
          bgColorAndFont="bg-gradient-to-b from-[#4C38C2] to-[#2F2188] justify-center gap-2"
        />
      </div>
    </div>
  );
};

export default GreetingsForms;

interface FeatureCardProps {
  img: string;
  title: string;
  description: string;
  height: number;
  width: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  img,
  title,
  description,
  height,
  width,
}) => (
  <div className="flex items-center flex-row justify-start gap-4 rounded-lg p-4 border border-[#F4F4F4] dark:border-gray-500 bg-[#ffffff] dark:bg-[#404040]">
    <Image src={img} alt="title" height={height} width={width} />
    <div className="flex flex-col gap-1">
      <h3 className="font-semibold text-[#757575] dark:text-gray-300">
        {title}
      </h3>
      <p className="text-sm font-normal text-[#868686] dark:text-slate-300">
        {description}
      </p>
    </div>
  </div>
);

interface FunctionalityProps {
  name: string;
  icon: string;
}

const Functionalities: React.FC<FunctionalityProps> = ({ name, icon }) => (
  <button className="flex items-center justify-center  bg-[#F4F4F4] dark:bg-[#121212] gap-[14px] p-2 rounded-[4px]">
    <p className="text-[#797979] font-normal leading-5">{name}</p>
    <Image src={icon} alt={name} height={24} width={24} />
  </button>
);

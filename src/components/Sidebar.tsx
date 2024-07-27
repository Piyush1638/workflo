import React from "react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen min-w-64 bg-white border-r shadow-sm fixed left-0">
      <div className="flex items-center p-4 gap-2">
        <Image
          src="/svg/Profile-img.svg" // Update with actual path
          alt="Profile Picture"
          className="rounded-full"
          width={40}
          height={40}
        />
        <h3 className="font-medium text-xl leading-6">Joe Biden</h3>
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="flex items-center justify-start gap-4">
          <Image
            src="/svg/sidebar/notification.svg"
            alt=""
            height={24}
            width={24}
            className="cursor-pointer"
          />
          <Image
            src="/svg/sidebar/theme.svg"
            alt=""
            height={24}
            width={24}
            className="cursor-pointer"
          />

          <Image
            src="/svg/sidebar/next.svg"
            alt=""
            height={24}
            width={24}
            className="cursor-pointer"
          />
        </div>
        <button className="bg-[#F4F4F4] text-[#797979] font-normal p-2 rounded">
          Logout
        </button>
      </div>

      <div className="flex flex-col p-4">
        <SidebarItem icon="/svg/sidebar/home.svg" label="Home" />
        <SidebarItem icon="/svg/sidebar/boards.svg" label="Boards" />
        <SidebarItem icon="/svg/sidebar/settings.svg" label="Settings" />
        <SidebarItem icon="/svg/sidebar/teams.svg" label="Teams" />
        <SidebarItem icon="/svg/sidebar/analytics.svg" label="Analytics" />
        <button className="mt-4 w-full bg-gradient-to-b from-[#4C38C2] to-[#2F2188] text-white py-2 px-4 rounded-md text-left flex items-center justify-center gap-2">
          Create new task{" "}
          <Image src={"/svg/create-new.svg"} alt="..." height={24} width={24} />
        </button>
      </div>
      <div className="mt-auto p-4">
        <button className="flex items-center w-full py-2 px-4 bg-gray-100 rounded-md text-left">
          <Image
            src="/svg/sidebar/download.svg"
            alt="..."
            height={24}
            width={24}
          />
          <span className="ml-4">
            Download the app <br />{" "}
            <span className="text-sm">Get the full experience</span>{" "}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

interface SideBarItemProps {
  icon: string;
  label: string;
}

const SidebarItem: React.FC<SideBarItemProps> = ({ icon, label }) => {
  return (
    <button className="flex items-center p-2 rounded-md text-left text-gray-800 hover:bg-gray-100 w-full">
      <Image src={icon} alt="..." height={24} width={24} />
      <span className="ml-4 text-xl leading-6">{label}</span>
    </button>
  );
};

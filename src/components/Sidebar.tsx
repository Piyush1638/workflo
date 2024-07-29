"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AddNewButton from "./AddNewButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { setUserInfo } from "@/lib/features/userInfoSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/store"; // Make sure to import your store's type

interface UserInfo {
  name: string;
  email: string;
  id: string;
}

const Sidebar = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);

  const logout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/sign-out");
      if (response.data.success) {
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const getFirstTwoWords = (name: string) => {
    const words = name.split(" ");
    return words.slice(0, 2).join(" ");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("/api/users/userInfo");
        const { name, email, _id: id } = res.data.user;
        dispatch(setUserInfo({ name, email, id }));
        setUserInfoState({ name, email, id });
      } catch (error: any) {
        console.error(
          "Error fetching user info:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen min-w-64 bg-white border-r shadow-sm fixed left-0">
      <div className="flex items-center p-4 gap-2">
        {/* <Image
          src="/svg/Profile-img.svg" // Update with actual path
          alt="Profile Picture"
          className="rounded-full"
          width={40}
          height={40}
        /> */}
        <div className="h-10 w-10 rounded-full flex items-center justify-center p-1 text-2xl border-2 border-gray-400">
          {userInfo?.name[0]}
        </div>
        <h3 className="font-medium text-xl leading-6">
          {userInfo ? getFirstTwoWords(userInfo.name) : ""}
        </h3>{" "}
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
        {loading ? (
          <Loading />
        ) : (
          <button
            onClick={logout}
            className="bg-[#F4F4F4] text-[#797979] font-normal p-2 rounded"
          >
            Logout
          </button>
        )}
      </div>

      <div className="flex flex-col p-4 gap-2">
        <SidebarItem icon="/svg/sidebar/home.svg" label="Home" />
        <SidebarItem icon="/svg/sidebar/boards.svg" label="Boards" />
        <SidebarItem icon="/svg/sidebar/settings.svg" label="Settings" />
        <SidebarItem icon="/svg/sidebar/teams.svg" label="Teams" />
        <SidebarItem icon="/svg/sidebar/analytics.svg" label="Analytics" />
        <AddNewButton
          bgColorAndFont="bg-gradient-to-b from-[#4C38C2] to-[#2F2188] shadow shadow-lg justify-center gap-2 mt-2"
          status=""
          buttonText="Create New Task"
        />
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

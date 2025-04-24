import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { UserInfo } from "@/lib/interfaces/interfaces";
import Image from "next/image";

const ResponsiveAside = ({ userInfo }: { userInfo: UserInfo | null }) => {
  return (
    <Sheet>
      <SheetTrigger className="m-4">
        <div className="flex flex-col gap-1">
            <div className="dark:bg-gray-400 bg-black h-1 w-8 rounded-md"/>
            <div className="dark:bg-gray-400 bg-black h-1 w-8 rounded-md"/>
            <div className="dark:bg-gray-400 bg-black h-1 w-8 rounded-md"/>
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-white dark:bg-[#1b1b1b]">
        <SheetHeader>
          {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
          <SheetDescription>
            <Sidebar userInfo={userInfo} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ResponsiveAside;

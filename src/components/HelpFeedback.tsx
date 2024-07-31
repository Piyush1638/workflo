import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

const HelpFeedback = () => {
  return (
    <div className="flex items-center gap-2 text-sm font-normal cursor-pointer">
      Help & Feedback
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="dark:bg-slate-300 dark:rounded-full dark:p-1">
            <Image
              src={"/svg/help&feedback.svg"}
              alt=""
              height={20}
              width={20}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Email: piyushkumarsingh665@gmail.com</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default HelpFeedback;

"use client";

import { Message, Story } from "@prisma/client";
import React, { FC } from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface StoryHeaderProps {
  story: Story & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const StoryHeader: FC<StoryHeaderProps> = ({ story }) => {
  const router = useRouter();

  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button size="icon" variant="ghost" onClick={() => router.back()}>
          <ChevronLeft className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default StoryHeader;

"use client";

import StoryHeader from "@/components/story-header";
import { Message, Story } from "@prisma/client";
import React, { FC } from "react";

interface StoryClientProps {
  story: Story & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const StoryClient: FC<StoryClientProps> = ({ story }) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <StoryHeader story={story} />
    </div>
  );
};

export default StoryClient;

"use client";

import { Story } from "@prisma/client";
import React, { FC } from "react";

interface StoryMessagesProps {
  story: Story;
  isLoading: boolean;
  messages: any[];
}

const StoryMessages: FC<StoryMessagesProps> = ({
  story,
  isLoading,
  messages,
}) => {
  return <div className="flex-1 overflow-y-auto pr-4">MESSAGES</div>;
};

export default StoryMessages;

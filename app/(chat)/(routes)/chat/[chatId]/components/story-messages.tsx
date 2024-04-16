"use client";

import { Story } from "@prisma/client";
import React, { FC } from "react";
import StoryMessage, { StoryAgent } from "./story-message";

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
  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <StoryMessage
        src={story.src}
        role={StoryAgent.System}
        content={`Welcome players, welcome to your untold story ${story.name}, ${story.description}.`}
        isLoading={isLoading}
      />
      <StoryMessage
        src={story.src}
        role={StoryAgent.User}
        content={`Lets play!`}
        isLoading={isLoading}
      />
    </div>
  );
};

export default StoryMessages;

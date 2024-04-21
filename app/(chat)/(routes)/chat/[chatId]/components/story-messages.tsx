"use client";

import { Story } from "@prisma/client";
import React, { ElementRef, FC, useEffect, useRef, useState } from "react";
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
  const scrollRef = useRef<ElementRef<"div">>(null);
  const [fakeLoading, setFakeLoading] = useState(messages.length === 0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  });

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <StoryMessage
        src={story.src}
        role={StoryAgent.System}
        content={`Welcome players, welcome to your untold story ${story.name}, ${story.description}.`}
        isLoading={fakeLoading}
      />
      {messages.map((message) => (
        <StoryMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={message.src}
        />
      ))}
      {isLoading && (
        <StoryMessage role={StoryAgent.System} src={story.src} isLoading />
      )}
      <div ref={scrollRef} />
    </div>
  );
};

export default StoryMessages;

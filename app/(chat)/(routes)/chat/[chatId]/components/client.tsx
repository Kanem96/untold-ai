"use client";

import { Message, Story } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCompletion } from "ai/react";
import React, { FC, FormEvent, useState } from "react";
import StoryHeader from "./story-header";
import StoryMessages from "./story-messages";
import StoryForm from "./story-form";

interface StoryClientProps {
  story: Story & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const StoryClient: FC<StoryClientProps> = ({ story }) => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>(story.messages);

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${story.id}`,
      onFinish(prompt, completion) {
        const systemMessage = {
          role: "system",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);

    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <StoryHeader story={story} />
      <StoryMessages story={story} isLoading={isLoading} messages={messages} />
      <StoryForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default StoryClient;

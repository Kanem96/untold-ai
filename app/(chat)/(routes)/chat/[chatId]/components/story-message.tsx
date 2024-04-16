"use client";

import AiAvatar from "@/components/ai-avatar";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { FC } from "react";
import { BeatLoader } from "react-spinners";

export enum StoryAgent {
  System = "system",
  User = "user",
}

export interface StoryMessageProps {
  role: StoryAgent;
  content?: string;
  isLoading?: boolean;
  src?: string;
}

const StoryMessage: FC<StoryMessageProps> = ({
  role,
  content,
  isLoading,
  src,
}) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard",
    });
  };

  return (
    <div
      className={cn(
        "group flex items-start gap-x-3 py-4 w-full",
        role === StoryAgent.User && "justify-end"
      )}
    >
      {role !== StoryAgent.User && src && <AiAvatar src={src} />}
      <div
        className={cn(
          "rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10",
          role === StoryAgent.User && "bg-purple-800/30"
        )}
      >
        {isLoading ? (
          <BeatLoader size={5} color={theme === "light" ? "black" : "white"} />
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export default StoryMessage;

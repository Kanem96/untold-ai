"use client";

import AiAvatar from "@/components/ai-avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
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
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 transition"
          size="icon"
          variant="ghost"
        >
          <Copy className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default StoryMessage;

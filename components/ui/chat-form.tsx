import React, { ChangeEvent, FC, FormEvent } from "react";
import { ChatRequestOptions } from "ai";
import { Input } from "./input";
import { Button } from "./button";
import { SendHorizonal } from "lucide-react";

interface ChatFormProps {
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  isLoading: boolean;
}

const ChatForm: FC<ChatFormProps> = ({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-priamry/10 py-4 flex items-center gap-x-2"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="What will you do?"
        className="rounded-lg bg-primary/10"
      />
      <Button disabled={isLoading} variant="ghost">
        <SendHorizonal className="w-6 h-6" />
      </Button>
    </form>
  );
};

export default ChatForm;
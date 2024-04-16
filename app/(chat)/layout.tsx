import React, { FC } from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout: FC<ChatLayoutProps> = ({ children }) => {
  return <div className="mx-auto max-2-4xl h-full">{children}</div>;
};

export default ChatLayout;

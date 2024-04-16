import React, { FC } from "react";

interface StoryLayoutProps {
  children: React.ReactNode;
}

const StoryLayout: FC<StoryLayoutProps> = ({ children }) => {
  return <div className="mx-auto max-w-4xl h-full w-full">{children}</div>;
};

export default StoryLayout;

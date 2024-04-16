import React, { FC } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

interface AiAvatarProps {
  src: string;
}

const AiAvatar: FC<AiAvatarProps> = ({ src }) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default AiAvatar;

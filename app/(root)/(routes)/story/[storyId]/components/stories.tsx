import { Story } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";

interface StoriesProps {
  data: (Story & {
    _count: {
      messages: number;
    };
  })[];
}

const Stories: FC<StoriesProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image
            className="grayscale"
            alt="Empty"
            src="/book.png"
            width={300}
            height={300}
          />
        </div>
        <p className="test-sm text-muted-foreground">No stories found.</p>
      </div>
    );
  }

  return <div>Stories</div>;
};

export default Stories;

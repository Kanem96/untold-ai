import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Story } from "@prisma/client";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl-grid-cols-6 gap-2 pb-10">
      {data.map((story) => (
        <Card
          key={story.id}
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <Link href={`/chat/${story.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-32 h-32">
                <Image
                  src={story.src}
                  fill
                  className="founded-xl object-cover"
                  alt="story"
                />
              </div>
              <p className="font-bold">{story.name}</p>
              <p className="text-xs">{story.description}</p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between tesxt-xs text-muted-foreground">
              <p>@{story.userName}</p>
              <div className="flex items-center">
                <MessagesSquare className="w-3 h-3 mr-1" />
                {story._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Stories;

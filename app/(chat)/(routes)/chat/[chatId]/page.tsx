import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import StoryClient from "./components/client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage: FC<ChatIdPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const story = await prismadb.story.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!story) {
    return redirect("/");
  }

  return <StoryClient story={story} />;
};

export default ChatIdPage;

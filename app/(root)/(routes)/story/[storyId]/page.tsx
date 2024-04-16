import prismadb from "@/lib/prismadb";
import React, { FC } from "react";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import CreateStoryForm from "./components/create-story-form";

interface StoryIdPageProps {
  params: {
    storyId: string;
  };
}

const StoryIdPage: FC<StoryIdPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const story = await prismadb.story.findUnique({
    where: {
      userId,
      id: params.storyId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <CreateStoryForm initialData={story} categories={categories} />;
};

export default StoryIdPage;

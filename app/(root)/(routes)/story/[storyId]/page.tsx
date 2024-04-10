import prismadb from "@/lib/prismadb";
import React, { FC } from "react";
import StoryForm from "./components/story-form";

interface StoryIdPageProps {
  params: {
    storyId: string;
  };
}

const StoryIdPage: FC<StoryIdPageProps> = async ({ params }) => {
  const story = await prismadb.story.findUnique({
    where: {
      id: params.storyId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <StoryForm initialData={story} categories={categories} />;
};

export default StoryIdPage;

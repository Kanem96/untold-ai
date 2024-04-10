"use client";

import * as z from "zod";
import { Category, Story } from "@prisma/client";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  FANTASY_PREAMBLE,
  FANTASY_SEED_GAMEPLAY,
} from "../story-constants/fantasy";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const difficulties = ["Relaxed", "Adventurer", "Veteran", "Hardcore"];

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  instructions: z.string().min(200, {
    message: "Instructions require at least 200 characters.",
  }),
  seed: z.string().min(200, {
    message: "Seeds require at least 200 characters.",
  }),
  src: z.string().min(1, {
    message: "Image is required.",
  }),
  difficulty: z.string().min(1, {
    message: "Difficulty is required.",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
});

interface StoryFormProps {
  initialData: Story | null;
  categories: Category[];
}

const StoryForm: FC<StoryFormProps> = ({ initialData, categories }) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      difficulty: undefined,
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/story/${initialData.id}`, values);
        toast({ description: "Story updated" });
      } else {
        await axios.post("/api/story", values);
        toast({ description: "A new story has begun" });
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      toast({ variant: "destructive", description: "Something went wrong" });
    }
  };

  //TODO: Change form background based on selected category
  //TODO: Move these form fields into a component
  return (
    <div className="bg-[url('/cyberpunk.jpg')] bg-cover">
      <div className="h-full p-4 space-y-2 max-w-3xl mx-auto bg-secondary">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-10"
          >
            <div className="space-y-2 w-full">
              <div>
                <h3 className="text-lg font-mdeium">General Information</h3>
                <p className="text-sm text-muted-foreground">
                  General information about your story
                </p>
              </div>
              <Separator className="bg-primary/10" />
            </div>
            <FormField
              name="src"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center space-y-4">
                  <FormControl>
                    <ImageUpload
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="New Story"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is what your story will be named
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Describe your story"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will give a brief description of your story setting
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Category</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a category for your story
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="difficulty"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Difficulty</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a difficulty"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {difficulties.map((difficulty) => (
                          <SelectItem key={difficulty} value={difficulty}>
                            {difficulty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This will determine how harsh the AI is to your players
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2 w-full">
              <div>
                <h3 className="text-lg font-medium">Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed instruction for AI behavior
                </p>
              </div>
              <Separator className="bg-primary/10" />
            </div>
            <FormField
              name="instructions"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-background resize-none"
                      disabled={isLoading}
                      rows={7}
                      placeholder={FANTASY_PREAMBLE}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will give a brief description of your story setting
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your story
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="seed"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Example Gameplay</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-background resize-none"
                      disabled={isLoading}
                      rows={7}
                      placeholder={FANTASY_SEED_GAMEPLAY}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will inform the AI on how to generate the story that
                    unfolds in your story.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edit your story setting" : "Create your story"}
              <BookOpen className="w-6 h-6 pl-2" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StoryForm;

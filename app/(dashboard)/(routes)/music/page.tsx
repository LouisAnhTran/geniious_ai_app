"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import headings from "@/components/headings";
import HeadingComponent from "@/components/HeadingComponent";
import { LucideIcon, MessageSquare, Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
} from "openai/resources/index.mjs";
import EmptyComponent from "@/components/EmptyComponent";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt must be at least 1 character",
  }),
});

const MusicPage = ({}) => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values);

      console.log("response :",response)

      setMusic(response.data);

      form.reset();
    } catch (error: any) {
      // Todo: open pro modal
      console.log(error);
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <HeadingComponent
        title="Music Generation"
        description="Turn your prompt into music"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      ></HeadingComponent>

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
            rounded-lg
            border
            w-full
            p-4
            px-3
            md:px-6
            focus-within:shadow-sm
            grid
            grid-cols-12
            gap-2"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        placeholder="Piano Solo"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {/* Loading */}
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader></Loader>
            </div>
          )}

          {!music && !isLoading && (
            <div>
              <EmptyComponent label="No Music Generated"></EmptyComponent>
            </div>
          )}

          {music && (
            <audio controls className='w-full mt-8'>
              <source src={music}/>
            </audio>
          )}

        

        </div>
      </div>
    </div>
  );
};

export default MusicPage;

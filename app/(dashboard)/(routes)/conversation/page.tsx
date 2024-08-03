"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import headings from "@/components/headings";
import HeadingComponent from "@/components/HeadingComponent";
import { LucideIcon, MessageSquare } from "lucide-react";
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
import { useProModal } from "@/hooks/use-pro-madal";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt must be at least 1 character",
  }),
});

// Define type for message content part
type ChatCompletionContentPart = {
  // Define the structure if known, otherwise, use `any`
  // e.g., type: string; content: string;
  [key: string]: any;
};


// Utility function to convert content to string
const convertContentToString = (content: string | ChatCompletionContentPart[] | null | undefined): string => {
  if (typeof content === 'string') {
    return content;
  } else if (Array.isArray(content)) {
    return content.map(part => typeof part === 'string' ? part : JSON.stringify(part)).join(' ');
  }
  return '';
};

const ConversationPage = ({}) => {
  const proModal=useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

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
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      console.log("response server: ", response);

      console.log("response from server: ", response.data);

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      // Todo: open pro modal
      console.log("nana-error: ",error);
      if(error?.response?.status === 403){
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <HeadingComponent
        title="Conversation"
        description="Our most advanced conversation model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                        placeholder="What you are thinking?"
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

          {messages.length === 0 && !isLoading && (
            <div>
              <EmptyComponent label="No Conversation Added"></EmptyComponent>
            </div>
          )}

          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div 
              key={index}
              className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",message.role === 'user' ? "bg-white border border-black/10" : "bg-muted")}
              >

                  {message.role  === "user" ? <UserAvatar></UserAvatar> : <BotAvatar></BotAvatar>}

                <p className="text-sm">
                {convertContentToString(message.content)}
                </p>
                </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConversationPage;

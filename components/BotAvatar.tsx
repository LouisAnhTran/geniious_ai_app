import React from "react";
import { AvatarFallback } from "./ui/avatar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { SiOpenai } from "react-icons/si";


const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1" src='/images.png'></AvatarImage>
    </Avatar>
  );
};

export default BotAvatar;

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { AvatarFallback } from "./ui/avatar";

const UserAvatar = () => {
  const { user } = useUser();

  console.log("user ",user);

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.imageUrl}></AvatarImage>
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

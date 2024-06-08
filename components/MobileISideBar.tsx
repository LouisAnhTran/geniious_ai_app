"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

import Sidebar from "./Sidebar";


const MobileISideBar = () => {
  const [isMounted,setIsMounted]=useState(false);
  const count=0;

  useEffect(()=>{
    setIsMounted(true);
  },[]);

  if(!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="md:hidden"></Menu>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 bg-[#111827]">
      <Sidebar apiLimitCount={count}></Sidebar>
      </SheetContent>
    </Sheet>
  );
};

export default MobileISideBar;

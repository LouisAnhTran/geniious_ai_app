import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import Typewriter from "typewriter-effect";
import Typewriter from "typewriter-effect";

const LandingPage = () => {
  return (
    <>
      <div className="bg-[#111827] h-full w-full flex flex-col">
        <div className="flex flex-row justify-between pt-4">
          <div className="text-white pl-4 flex flex-row space-x-4 align-middle items-center">
            <Image src="/ai-logo.png" width={50} height={50} alt="logo app" />
            <p className="text-4xl font-bold">Genious</p>
          </div>
          <div className="pr-5">
            <Link href="/dashboard">
              <Button className="text-xl rounded-2xl bg-slate-300 text-black hover:font-bold hover:bg-white transition-all delay-75">
                Get started
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col align-middle justify-center items-center h-full">
          <p className="text-slate-200 text-7xl font-bold">
            The Best AI Tool for
          </p>
          <div className="text-white text-6xl mt-4 text-transparent bg-clip-text bg-gradient-to-r font-semibold from-purple-500 to-pink-700">
            Fast Content Generation
          </div>
          <p className="text-slate-500 mt-6 text-xl italic">
            Create content usin AI 10x Faster
          </p>
          <Link href="/dashboard">
            <Button className="mt-6 hover:font-bold rounded-lg bg-gradient-to-r from-purple-500 to-pink-700">
              Start Generating For Free
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

{
  /* <SignedIn>
          <SignOutButton></SignOutButton>
        </SignedIn>

        <SignedOut>
          <div>
            <SignInButton></SignInButton>
          </div>

          <div>
            <SignUpButton></SignUpButton>
          </div>
        </SignedOut> */
}

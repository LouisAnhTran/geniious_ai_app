import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { showCountLimit } from "@/lib/api-limits";

const inter = Inter({ subsets: ["latin"] });

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // get count here
  const count=await showCountLimit(); 


  return (
    <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
            <Sidebar apiLimitCount={count}></Sidebar>
        </div>

        <main className="h-full md:pl-72">
            <Navbar></Navbar>
            {children}
        </main>

    </div>
  );
}

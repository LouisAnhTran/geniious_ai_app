import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-blue-300 flex items-center justify-center h-full">{children}</div>
  );
}

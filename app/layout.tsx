import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { ModalProvider } from "@/components/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genious",
  description: "AI Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>
        <ModalProvider></ModalProvider>
        {children}
      </body>
    </html>
    </ClerkProvider>
    
  );
}

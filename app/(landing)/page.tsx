import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      Landing Page Unprotected
      <SignedIn>
        <SignOutButton></SignOutButton>
      </SignedIn>
      
      <SignedOut>
        <div>
          <SignInButton></SignInButton>
        </div>
        <div>
          <SignUpButton></SignUpButton>
        </div>
      </SignedOut>
    </div>
  );
};

export default LandingPage;

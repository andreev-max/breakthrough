"use client";

import { signIn, signOut } from "next-auth/react";
import { FC } from "react";
import { Button } from "./ui/Button";
import { Session } from "next-auth";

interface AuthButtonProps {
  session: Session | null;
}

export const AuthButton: FC<AuthButtonProps> = ({ session }) => {
  const isAuthenticated = session?.user;

  return (
    <Button
      variant="primary"
      onClick={isAuthenticated ? () => void signOut() : () => void signIn()}
    >
      {isAuthenticated ? "Sign Out" : "Sign In"}
    </Button>
  );
};

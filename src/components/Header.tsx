"use client";

import { signIn, signOut } from "next-auth/react";
import { FC } from "react";
import { Button } from "./ui/Button";
import { Session } from "next-auth";

interface HeaderProps {
  session: Session | null;
}

export const Header: FC<HeaderProps> = ({ session }) => {
  const isAuthenticated = session?.user;

  return (
    <Button
      variant="subtle"
      onClick={isAuthenticated ? () => void signOut() : () => void signIn()}
    >
      {isAuthenticated ? "Sign Out" : "Sign In"}
    </Button>
  );
};

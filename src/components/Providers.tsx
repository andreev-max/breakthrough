"use client";

import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider defaultTheme="system" enableSystem>
        <SessionProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;

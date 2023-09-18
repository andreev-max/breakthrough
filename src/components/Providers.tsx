"use client";

import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ModalProvider } from "./ModalContext";
import { Modal } from "./Modal";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider defaultTheme="system" enableSystem>
        <SessionProvider>
          <ModalProvider>
            <Modal />
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </ModalProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;

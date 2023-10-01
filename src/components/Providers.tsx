"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ModalProvider } from "./ModalContext";
import { Modal } from "./Modal";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <ThemeProvider defaultTheme="system" enableSystem>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <ModalProvider>
              <Modal />
              <Toaster position="bottom-right" reverseOrder={false} />
              {children}
            </ModalProvider>
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;

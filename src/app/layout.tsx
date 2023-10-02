import Providers from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthButton } from "@/components/AuthButton";
import Link from "next/link";
import { navigationConfig } from "@/lib/routes";
import { getServerAuthSession } from "@/lib/auth";
import { Navigation } from "@/components/Navigation";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "breakthrough",
  description: "This is the breakthrough",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body
        className={cn(
          "theme-blue flex h-screen flex-col items-center gap-2 overflow-hidden bg-base800 px-1 pb-[68px] pt-1 antialiased",
          inter.className,
        )}
      >
        <Providers>
          <main className="w-full grow overflow-auto overscroll-none rounded bg-base950 px-2 py-4 scrollbar scrollbar-thumb-primary700 scrollbar-thumb-rounded-2xl scrollbar-w-1 scrollbar-h-1 hover:scrollbar-thumb-primary600 focus:ring-offset-2">
            {children}
          </main>
          <header className="fixed bottom-1 flex min-h-[64px] w-full items-center justify-between gap-1 rounded-lg border-4 border-base800 bg-base950 px-2 py-1 sm:h-20 sm:px-4 sm:py-2">
            <Navigation />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <AuthButton session={session} />
            </div>
          </header>
        </Providers>
      </body>
    </html>
  );
}

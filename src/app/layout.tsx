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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "breakthrough",
  description: "This is the breakthrough",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body
        className={cn(
          "theme-blue flex h-screen flex-col items-center gap-2 overflow-hidden bg-base800 p-2 antialiased",
          inter.className,
        )}
      >
        <Providers>
          <header className="flex min-h-[64px] w-full items-center justify-between gap-1 rounded-lg bg-base950 px-2 py-1 sm:h-20 sm:px-4 sm:py-2">
            <Navigation />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <AuthButton session={session} />
            </div>
          </header>
          <main className="scrollbar scrollbar-w-1 scrollbar-h-1 hover:scrollbar-thumb-primary600 scrollbar-thumb-rounded-2xl scrollbar-thumb-primary700 w-full flex-grow overflow-auto rounded-lg bg-base950 px-3 py-4 focus:ring-offset-2">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

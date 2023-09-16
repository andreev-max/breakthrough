import Providers from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Header } from "@/components/Header";
import Link from "next/link";
import { navigationConfig } from "@/lib/routes";

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
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={cn(
          "theme-blue flex min-h-screen flex-col items-center gap-2 bg-base800 p-2 antialiased overflow-hidden",
          inter.className
        )}
      >
        <Providers>
          <header className="flex gap-1 justify-between min-h-[64px] w-full items-center rounded-lg bg-base950 px-2 py-1 sm:h-20 sm:px-4 sm:py-2">
            <Link href={navigationConfig.home.href}>
              {navigationConfig.home.title}
            </Link>
            <Link href={navigationConfig.sets.href}>
              {navigationConfig.sets.title}
            </Link>
            <ThemeToggle />
            <Header session={session} />
          </header>
          <main className="w-full flex-grow rounded-lg bg-base950 p-2 overflow-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

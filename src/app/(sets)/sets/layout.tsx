import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <section
      style={{ backgroundColor: "var(--base-500)" }}
      className="relative flex min-h-full flex-col"
    >
      <h1 className="mb-5 self-center text-2xl font-semibold">My Sets</h1>
      {children}
    </section>
  );
}

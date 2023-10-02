import { getServerAuthSession } from "@/lib/auth";
import { Content } from "./components/Content";
import { getSetsWithWordCount } from "@/db-calls/getSets";
import { redirect } from "next/navigation";

export default async function SetsPage() {
  const session = await getServerAuthSession();

  if (!session?.user.id) {
    redirect("/login");
  }

  const sets = await getSetsWithWordCount();

  return (
    <section className="relative flex min-h-full flex-col">
      <h1 className="mb-5 self-center text-2xl font-semibold">My Sets</h1>
      <Content initialSets={sets} userId={session.user.id} />
    </section>
  );
}

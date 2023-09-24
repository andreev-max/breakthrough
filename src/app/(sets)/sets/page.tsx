import { getServerAuthSession } from "@/lib/auth";
import { Content } from "./components/Content";
import { getSetsWithWordCount } from "@/db-calls/getSets";

export default async function SetsPage() {
  const session = await getServerAuthSession();
  const sets = await getSetsWithWordCount();

  return (
    <section className="flex flex-col">
      <h1 className="mb-5 self-center text-2xl font-semibold">My Sets</h1>
      {session?.user.id && (
        <Content initialSets={sets} userId={session.user.id} />
      )}
    </section>
  );
}

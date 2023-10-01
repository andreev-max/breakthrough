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

  return <Content initialSets={sets} userId={session.user.id} />;
}

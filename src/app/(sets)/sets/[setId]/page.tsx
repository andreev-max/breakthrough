import { getSetWithWords } from "@/db-calls/getSet";
import { getServerAuthSession } from "@/lib/auth";
import { Content } from "./components/Content";
import { redirect } from "next/navigation";

export default async function SetPage({
  params,
}: {
  params: { setId: string };
}) {
  console.log({ params });

  const session = await getServerAuthSession();

  if (!session?.user.id) {
    redirect("/login");
  }

  const set = await getSetWithWords(params.setId);

  return (
    <section className="flex flex-col">
      <Content userId={session.user.id} initialSet={set} />
    </section>
  );
}

import { getSetWithWords } from "@/db-calls/getSet";
import { getServerAuthSession } from "@/lib/auth";
import { Content } from "./components/Content";

export default async function SetPage({
  params,
}: {
  params: { setId: string };
}) {
  console.log({ params });

  const session = await getServerAuthSession();
  const set = await getSetWithWords(params.setId);
  return (
    <section className="flex flex-col">
      {session?.user.id && (
        <Content userId={session?.user.id} initialSet={set} />
      )}
    </section>
  );
}

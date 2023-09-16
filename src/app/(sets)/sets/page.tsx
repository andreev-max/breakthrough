import { getServerAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function SetsPage(props: any) {
  const session = await getServerAuthSession();
  const sets = await db.set.findMany();

  return (
    <div>
      <h1>SETS page</h1>
      <p>{JSON.stringify(props)}</p>
      <p>{JSON.stringify(sets)}</p>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}

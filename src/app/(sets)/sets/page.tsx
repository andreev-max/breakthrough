import { getServerAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Content } from "./Content";

export default async function SetsPage(props: any) {
  const session = await getServerAuthSession();
  const sets = await db.set.findMany();

  return (
    <div className="flex flex-col">
      <h1 className="self-center mb-4">My Sets</h1>
      {/* <p>{JSON.stringify(props)}</p> */}
      {/* <p>{JSON.stringify(session)}</p> */}
      {session?.user.id && <Content sets={sets} userId={session.user.id} />}
    </div>
  );
}

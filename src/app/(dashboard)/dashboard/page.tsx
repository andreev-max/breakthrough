import { getServerAuthSession } from "@/lib/auth";

export default async function Page() {
  const session = await getServerAuthSession();
  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}

import { Prisma } from "@prisma/client";
import { getServerAuthSession } from "../lib/auth";
import { db } from "../lib/db";

export async function getSetsWithWordCount() {
  const session = await getServerAuthSession();

  if (session?.user) {
    return await db.set.findMany({
      where: { userId: session?.user.id },
      orderBy: { updatedAt: "desc" },
      select: {
        title: true,
        updatedAt: true,
        userId: true,
        id: true,
        _count: { select: { words: true } },
      },
    });
  }
}

export type SetsWithWordCount = Prisma.PromiseReturnType<
  typeof getSetsWithWordCount
>;

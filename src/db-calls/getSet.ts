import { Prisma } from "@prisma/client";
import { getServerAuthSession } from "../lib/auth";
import { db } from "../lib/db";

export async function getSetWithWords(id?: string) {
  if (!id) {
    throw new Error();
  }

  const session = await getServerAuthSession();

  if (session?.user) {
    return await db.set.findFirst({
      where: { userId: session?.user.id, id },
      select: {
        title: true,
        updatedAt: true,
        userId: true,
        id: true,
        words: true,
      },
    });
  }
}

export type SetWithWords = Prisma.PromiseReturnType<typeof getSetWithWords>;

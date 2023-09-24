import { getSetWithWords } from "@/db-calls/getSet";
import { getSetsWithWordCount } from "@/db-calls/getSets";
import { getServerAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log({ searchParams, id });
  try {
    const user = await getServerAuthSession().then((res) => res?.user);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized to perform this action." },
        { status: 401 },
      );
    }

    if (!id) {
      throw new Error();
    }

    const setWithWords = await getSetWithWords(id);

    console.log("result", setWithWords);
    return NextResponse.json(setWithWords, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }
}

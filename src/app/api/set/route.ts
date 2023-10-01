import { getSetsWithWordCount } from "@/db-calls/getSets";
import { getServerAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { newTitle } = await req.json();
    console.log(newTitle);
    const user = await getServerAuthSession().then((res) => res?.user);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized to perform this action." },
        { status: 401 },
      );
    }

    const { id, title, updatedAt, userId, _count } = await db.set.create({
      data: {
        title: newTitle,
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        updatedAt: true,
        userId: true,
        _count: { select: { words: true } },
      },
    });

    return NextResponse.json(
      { id, title, updatedAt, userId, _count },
      { status: 201 },
    );
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

export async function GET() {
  try {
    const user = await getServerAuthSession().then((res) => res?.user);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized to perform this action." },
        { status: 401 },
      );
    }

    const result = await getSetsWithWordCount();

    console.log("result", result);
    return NextResponse.json(result, { status: 200 });
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

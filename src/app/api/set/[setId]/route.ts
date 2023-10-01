import { getSetWithWords } from "@/db-calls/getSet";
import { getSetsWithWordCount } from "@/db-calls/getSets";
import { getServerAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: Request,
  { params }: { params: { setId: string } },
) {
  const { setId } = params;
  console.log({ setId });
  try {
    const user = await getServerAuthSession().then((res) => res?.user);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized to perform this action." },
        { status: 401 },
      );
    }

    if (!setId) {
      throw new Error();
    }

    const setWithWords = await getSetWithWords(setId);

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

export async function PUT(
  req: Request,
  { params }: { params: { setId: string } },
) {
  try {
    const { setId } = params;
    const { newTitle } = await req.json();
    console.log({ newTitle, setId });
    const user = await getServerAuthSession().then((res) => res?.user);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized to perform this action." },
        { status: 401 },
      );
    }

    const { id, title, updatedAt, userId, _count } = await db.set.update({
      where: {
        id: setId,
      },
      data: {
        title: newTitle,
      },
      select: {
        title: true,
        id: true,
        updatedAt: true,
        userId: true,
        _count: { select: { words: true } },
      },
    });

    return NextResponse.json(
      { id, title, updatedAt, userId, _count },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
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

export async function DELETE(
  req: Request,
  { params }: { params: { setId: string } },
) {
  try {
    const { setId } = params;
    const user = await getServerAuthSession().then((res) => res?.user);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized to perform this action." },
        { status: 401 },
      );
    }

    //validate

    const result = await db.set.delete({
      where: {
        id: setId,
      },
    });

    console.log("result", result);
    return NextResponse.json(setId, { status: 200 });
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

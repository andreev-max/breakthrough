import { getSetsWithWordCount } from "@/db-calls/getSets";
import { authOptions, getServerAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    console.log(title);
    const user = await getServerAuthSession().then((res) => res?.user);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized to perform this action." },
        { status: 401 },
      );
    }

    const result = await db.set.create({
      data: {
        title: title,
        userId: user.id,
      },
    });

    const createdSetForResponse = {
      title: result.title,
      updatedAt: result.updatedAt,
      userId: result.userId,
      id: result.id,
      _count: {
        words: 0,
      },
    };

    console.log("result", result);
    return NextResponse.json(createdSetForResponse, { status: 201 });
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

export async function PUT(req: Request) {
  try {
    const { newTitle, setId } = await req.json();
    console.log(newTitle);
    const user = await getServerAuthSession().then((res) => res?.user);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized to perform this action." },
        { status: 401 },
      );
    }

    const result = await db.set.update({
      where: {
        id: setId,
      },
      data: {
        title: newTitle,
      },
    });

    console.log("result", result);
    return NextResponse.json(result, { status: 200 });
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

export async function DELETE(req: Request) {
  try {
    const user = await getServerAuthSession().then((res) => res?.user);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized to perform this action." },
        { status: 401 },
      );
    }

    const { setId } = await req.json();
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

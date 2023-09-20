"use client";

import { Button } from "@/components/ui/Button";
import { FC, Suspense, useState } from "react";
import Icons from "@/components/Icons";
import toast from "react-hot-toast";
import { db } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ActionButton } from "./ActionButton";
import { SetsWithWordCount, getSetsWithWordCount } from "@/db-calls/getSets";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PrismaClient } from "@prisma/client";
import { useSet } from "@/queries/useSet";
import { SetCard } from "./SetCard";

interface ContentProps {
  initialSets: SetsWithWordCount;
  userId: string;
}

export const Content: FC<ContentProps> = ({ initialSets, userId }) => {
  const queryClient = useQueryClient();

  const [isCreating, setIsCreating] = useState(false);

  const { sets, areSetsLoading } = useSet(initialSets);

  const createNewSet = async () => {
    setIsCreating(true);

    try {
      console.log("here");
      const result = await fetch("/api/set", {
        method: "POST",
        body: JSON.stringify({ title: "zalupa" }),
        headers: { "Content-Type": "application/json" },
      });
      const result2 = await result.json();
      console.log({ result, result2 });

      queryClient.invalidateQueries({ queryKey: ["sets"] });
    } catch (e) {
      console.log(e);
      toast("Something went wrong with creating new set");
    } finally {
      setIsCreating(false);
    }
  };

  return sets && Boolean(sets?.length) ? (
    <>
      <Button isLoading={isCreating} onClick={createNewSet} className="mb-4">
        <Icons.Plus />
        Create New Set
      </Button>
      <ul className="flex flex-col gap-3">
        {sets.map((set) => {
          return <SetCard key={set.id} set={set} />;
        })}
      </ul>
    </>
  ) : (
    <>
      <h3 className="my-3 self-center text-xl">
        You don&apos;t have any sets for now
      </h3>
      <Button isLoading={isCreating} onClick={createNewSet}>
        <Icons.Plus />
        Create New Set
      </Button>
    </>
  );
};

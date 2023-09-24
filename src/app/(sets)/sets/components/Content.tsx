"use client";

import { FC } from "react";
import { SetsWithWordCount } from "@/db-calls/getSets";
import { useSets } from "@/queries/useSets";
import { SetCard } from "./SetCard";
import { NewSetForm } from "./NewSetForm";

interface ContentProps {
  initialSets: SetsWithWordCount;
  userId: string;
}

export const Content: FC<ContentProps> = ({ initialSets, userId }) => {
  const { sets, areSetsLoading } = useSets(initialSets);
  console.log(areSetsLoading); // TODO update loading
  return sets?.length ? (
    <>
      <NewSetForm />
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
      <NewSetForm />
    </>
  );
};

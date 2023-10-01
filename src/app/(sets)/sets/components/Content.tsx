"use client";

import { FC } from "react";
import { SetsWithWordCount } from "@/db-calls/getSets";
import { useSets } from "@/queries/useSets";
import { SetCard } from "./SetCard";
import { NewSetForm } from "./NewSetForm";
import Icons from "@/components/Icons";

interface ContentProps {
  initialSets: SetsWithWordCount;
  userId: string;
}

export const Content: FC<ContentProps> = ({ initialSets, userId }) => {
  const { sets, areSetsLoading, areSetsFetching } = useSets(initialSets);

  if (areSetsLoading) {
    return (
      <div className="flex w-full grow items-center justify-center text-primary500">
        <Icons.Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {areSetsFetching && (
        <div className="absolute inset-0 z-10 bg-base950/20" />
      )}
      {sets?.length ? (
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
      )}
    </>
  );
};

"use client";

import { SetWithWords } from "@/db-calls/getSet";
import { showToast } from "@/lib/showToast";
import { useSet } from "@/queries/useSet";
import { FC } from "react";

interface ContentProps {
  userId: string;
  initialSet: SetWithWords;
}

export const Content: FC<ContentProps> = ({ userId, initialSet }) => {
  const { set, isSetLoading } = useSet(initialSet);
  console.log({ userId, initialSet, set });
  return (
    <div>
      <h1 className="mb-5 self-center text-2xl font-semibold">
        {initialSet?.title ?? "Your Set"}
      </h1>
      {set?.words?.length ? (
        <ul>
          {set.words.map((set) => {
            return <li key={set.id}>{set.id}</li>;
          })}
        </ul>
      ) : (
        <h2>You don&apos;t have any words in this set for now</h2>
      )}
    </div>
  );
};

"use client";

import { Button } from "@/components/ui/Button";
import { FC, useState } from "react";
import Icons from "@/components/Icons";
import toast from "react-hot-toast";
import { db } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ActionButton } from "./ActionButton";

interface ContentProps {
  sets: any;
  userId: string;
}

export const Content: FC<ContentProps> = ({ sets, userId }) => {
  console.log(sets);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);

  const createNewSet = async () => {
    setIsCreating(true);

    try {
      const result = await db.set.create({
        data: { title: "new set", userId },
      });
      console.log(result);
    } catch (e) {
      console.log(e);
      toast("Something went wrong with creating new set");
    } finally {
      setIsCreating(false);
    }
  };

  const onEdit = () => {
    setIsEditingMode(true);
  };

  const onDelete = () => {};

  return Boolean(sets.length) ? (
    <>
      <Button isLoading={isCreating} onClick={createNewSet} className="mb-4">
        <Icons.Plus />
        Create New Set
      </Button>
      {sets.map((set: any) => {
        console.log(set);
        return (
          <li
            key={set.id}
            className="flex flex-col shadow-lg border rounded-lg border-base800"
          >
            <Link className="p-2" href={`/sets/${set.id}`}>
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-6 mt-2">
                  {isEditingMode ? (
                    <p>editing</p>
                  ) : (
                    <h3 className="text-2xl">{set.title}</h3>
                  )}
                </div>
                <ActionButton onEdit={onEdit} onDelete={onDelete} />
              </div>
              <p className="text-xs mb-5">{`Last time updated: ${formatDistanceToNow(
                set.updatedAt
              )}`}</p>
            </Link>
          </li>
        );
      })}
    </>
  ) : (
    <>
      <h3 className="self-center my-3 text-xl">
        You don&apos;t have any sets for now
      </h3>
      <Button isLoading={isCreating} onClick={createNewSet}>
        <Icons.Plus />
        Create New Set
      </Button>
    </>
  );
};

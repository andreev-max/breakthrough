"use client";

import { FC, FormEventHandler, useRef, useState } from "react";
import { ActionButton } from "./ActionButton";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Icons from "@/components/Icons";
import { SetsWithWordCount } from "@/db-calls/getSets";

interface SetCardProps {
  set: any;
}

export const SetCard: FC<SetCardProps> = ({ set }) => {
  const titleRef = useRef(set.title);
  const queryClient = useQueryClient();

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [titleValue, setTitleValue] = useState(set.title);

  const onEdit = () => {
    setIsEditingMode(true);
  };

  const onDelete = async () => {
    try {
      console.log("here");
      const result = await fetch(`/api/set/${set.id}`, {
        method: "DELETE",
      });
      const deletedSetId = await result.json();
      console.log({ result, deletedSetId });

      const staleSets = queryClient.getQueryData<SetsWithWordCount>(["sets"]);
      console.log(staleSets);
      queryClient.setQueryData(
        ["sets"],
        staleSets?.filter(({ id }) => id !== deletedSetId),
      );
    } catch (e) {
      console.log(e);
      toast("Something went wrong with deleting your set");
    }
  };

  const updateSetTitle: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (titleRef.current === titleValue) {
      setIsEditingMode(false);
      return;
    }
    try {
      console.log("here");
      console.log(titleValue);

      const result = await fetch(`/api/set/${set.id}`, {
        method: "PUT",
        body: JSON.stringify({ newTitle: titleValue }),
        headers: { "Content-Type": "application/json" },
      });
      const updatedSet = await result.json();
      console.log({ result, updatedSet });
      const staleSets = queryClient.getQueryData<SetsWithWordCount>(["sets"]);
      queryClient.setQueryData(
        ["sets"],
        staleSets?.map((set) => (set.id === updatedSet.id ? updatedSet : set)),
      );
    } catch (e) {
      console.log(e);
      toast("Something went wrong with deleting your set");
    } finally {
      setIsEditingMode(false);
    }
  };

  return (
    <li className="flex flex-col rounded border border-base200 p-2 shadow-lg">
      <div className="mb-2 flex justify-between">
        <div className="mt-2 flex items-center gap-6">
          {isEditingMode ? (
            <form onSubmit={updateSetTitle}>
              <Input
                inputValue={titleValue}
                setInputValue={setTitleValue}
                label="Edit your set title"
              >
                <Button
                  className="absolute bottom-1 right-0"
                  variant="ghost"
                  size="sm"
                  type="submit"
                >
                  <Icons.CheckCircle />
                </Button>
              </Input>
            </form>
          ) : (
            <h3 className="text-2xl font-semibold">{set.title}</h3>
          )}
        </div>
        <ActionButton onEdit={onEdit} onDelete={onDelete} />
      </div>
      <p className="mb-5 text-xs text-base200">
        Last time updated:{" "}
        <span className="text-sm text-base50">
          {formatDistanceToNow(new Date(set.updatedAt), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </span>
      </p>
      <div className="flex items-center justify-between">
        <p className="text-base font-light text-base200">
          Words count:{" "}
          <span className="text-lg font-semibold text-base50">
            {set._count.words}
          </span>
        </p>
        <Link
          className="rounded bg-base800 p-1 font-medium text-base100 hover:bg-base600 hover:text-base50"
          href={`/sets/${set.id}`}
        >
          Explore More
        </Link>
      </div>
    </li>
  );
};

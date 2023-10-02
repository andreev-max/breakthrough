"use client";
import Icons from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SetsWithWordCount } from "@/db-calls/getSets";
import { showToast } from "@/lib/showToast";
import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

export const NewSetForm = () => {
  const queryClient = useQueryClient();

  const [isInputShown, setIsInputShown] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newSetTitleValue, setNewSetTitleValue] = useState("");

  const showInput = () => {
    setIsInputShown(true);
  };

  const hideInput = () => {
    setIsInputShown(false);
  };

  const createNewSet = async (event: FormEvent) => {
    event.preventDefault();
    setIsCreating(true);

    if (!newSetTitleValue) {
      return;
    }

    try {
      const result = await fetch("/api/set", {
        method: "POST",
        body: JSON.stringify({ newTitle: newSetTitleValue }),
        headers: { "Content-Type": "application/json" },
      });
      const createdSet = await result.json();
      console.log({ result, createdSet });

      const staleSets = queryClient.getQueryData<SetsWithWordCount>(["sets"]);
      queryClient.setQueryData(
        ["sets"],
        staleSets ? [createdSet, ...staleSets] : [createdSet],
      );
      showToast(
        <p>
          <b>{createdSet.title}</b> has been created
        </p>,
      );
    } catch (e) {
      console.log(e);
      showToast("Something went wrong with creating new set", "error");
    } finally {
      setIsCreating(false);
      hideInput();
      setNewSetTitleValue("");
    }
  };

  return (
    <form className="mb-5 flex flex-col gap-4" onSubmit={createNewSet}>
      <Input
        inputValue={newSetTitleValue}
        setInputValue={setNewSetTitleValue}
        label="Create your new awesome set"
        wrapperClassName={isInputShown ? "flex" : "hidden"}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={hideInput}
          disabled={isCreating}
        >
          <Icons.Ban />
        </Button>
        <Button variant="ghost" size="sm" type="submit" disabled={isCreating}>
          <Icons.CheckCircle />
        </Button>
      </Input>
      <Button
        isLoading={isCreating}
        onClick={isInputShown ? undefined : showInput}
        className="w-full"
        type={`${isInputShown ? "submit" : "button"}`}
      >
        <Icons.Plus />
        Create New Set
      </Button>
    </form>
  );
};

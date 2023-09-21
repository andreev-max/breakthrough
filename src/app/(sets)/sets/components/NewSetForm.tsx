"use client";
import Icons from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

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

  const createNewSet = async () => {
    setIsCreating(true);

    if (!newSetTitleValue) {
      return;
    }

    try {
      console.log("here");
      const result = await fetch("/api/set", {
        method: "POST",
        body: JSON.stringify({ title: newSetTitleValue }),
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

  return (
    <form className="mb-5 flex flex-col gap-4" onSubmit={createNewSet}>
      <Input
        inputValue={newSetTitleValue}
        setInputValue={setNewSetTitleValue}
        label="Create your new awesome set"
        wrapperClassName={isInputShown ? "flex" : "hidden"}
      >
        <Button
          className="absolute bottom-1 right-9"
          variant="ghost"
          size="sm"
          onClick={hideInput}
          disabled={isCreating}
        >
          <Icons.Ban />
        </Button>
        <Button
          className="absolute bottom-1 right-0"
          variant="ghost"
          size="sm"
          type="submit"
          disabled={isCreating}
        >
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

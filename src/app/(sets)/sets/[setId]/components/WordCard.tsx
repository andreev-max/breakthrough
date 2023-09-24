"use client";

import { FC, FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Word } from ".prisma/client";

interface SetCardProps {
  word: Word;
}

export const SetCard: FC<SetCardProps> = ({ word }) => {
  const queryClient = useQueryClient();

  const [isEditingMode, setIsEditingMode] = useState(false);

  const onEdit = () => {
    setIsEditingMode(true);
  };

  const onDelete = async () => {
    try {
      console.log("here");
      const result = await fetch("/api/sets", {
        method: "DELETE",
        body: JSON.stringify({ setId: word.id }),
        headers: { "Content-Type": "application/json" },
      });
      const result2 = await result.json();
      console.log({ result, result2 });

      queryClient.invalidateQueries({ queryKey: ["sets"] });
    } catch (e) {
      console.log(e);
      toast("Something went wrong with deleting your set");
    }
  };

  const updateSetTitle: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    // if (titleRef.current === titleValue) {
    //   setIsEditingMode(false);
    //   return;
    // }
    // try {
    //   console.log("here");
    //   console.log(titleValue);

    //   const result = await fetch("/api/sets", {
    //     method: "PUT",
    //     body: JSON.stringify({ newTitle: titleValue, setId: set.id }),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   const result2 = await result.json();
    //   console.log({ result, result2 });
    //   setIsEditingMode(false);
    //   queryClient.invalidateQueries({ queryKey: ["sets"] });
    // } catch (e) {
    //   console.log(e);
    //   toast("Something went wrong with deleting your set");
    // }
  };

  return (
    <li className="flex flex-col rounded border border-base200 p-2 shadow-lg">
      <div className="mb-2 flex justify-between"></div>
    </li>
  );
};

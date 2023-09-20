"use client";

import { FC } from "react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import Icons from "@/components/Icons";
import { useModal } from "@/components/ModalContext";

interface ActionButtonProps {
  onEdit: () => void;
  onDelete: () => Promise<void>;
}

export const ActionButton: FC<ActionButtonProps> = ({ onEdit, onDelete }) => {
  const { openModal } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="group">
          <Icons.MoreVertical />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onEdit();
          }}
        >
          <Icons.PencilLine className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            openModal({
              title: "Delete Set",
              content: "Are you sure you want to delete this set?",
              primaryHandler: onDelete,
              secondaryHandler: () => {},
            });
          }}
        >
          <Icons.Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

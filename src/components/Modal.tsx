import React, { useState } from "react";
import { useModal } from "./ModalContext";
import { Button } from "./ui/Button";
import Icons from "./Icons";

export const Modal = () => {
  const [isActionBeingPerformed, setIsActionBeingPerformed] = useState(false);

  const { isModalOpen, closeModal, modalContent } = useModal();

  if (!isModalOpen) {
    return null;
  }

  const { title, content, primaryHandler, secondaryHandler } = modalContent;

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-base950/25 p-5 backdrop-blur-sm"
      onClick={() => {
        console.log("here");
        closeModal();
      }}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="max-h-full w-full max-w-2xl rounded bg-base950 p-2 shadow"
      >
        <div className="flex items-center justify-between border-b border-base700 pb-2">
          <h3 className="text-2xl font-medium text-base100">{title}</h3>
          <Button variant="ghost" size="sm" onClick={closeModal}>
            <Icons.XCircle strokeWidth={1} />
          </Button>
        </div>
        <div className="py-2 text-base200">{content}</div>
        {(primaryHandler || secondaryHandler) && (
          <div className="flex items-center justify-end gap-3 border-t border-base700 py-2">
            {secondaryHandler && (
              <Button
                onClick={() => {
                  secondaryHandler();
                  closeModal();
                }}
              >
                Cancel
              </Button>
            )}
            {primaryHandler && (
              <Button
                isLoading={isActionBeingPerformed}
                onClick={async () => {
                  setIsActionBeingPerformed(true);
                  await primaryHandler();
                  setIsActionBeingPerformed(false);
                  closeModal();
                }}
              >
                Ok
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

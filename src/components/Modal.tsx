import React from "react";
import { useModal } from "./ModalContext";
import { Button } from "./ui/Button";
import Icons from "./Icons";

export const Modal = () => {
  const { isModalOpen, closeModal, modalContent } = useModal();

  if (!isModalOpen) {
    return null;
  }

  const { title, content, primaryHandler, secondaryHandler } = modalContent;

  return (
    <div
      className="fixed inset-0 z-20 bg-base950/25 backdrop-blur-sm p-5 flex items-center justify-center"
      onClick={() => {
        console.log("here");
        closeModal();
      }}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="w-full max-w-2xl max-h-full p-2 bg-base950 rounded shadow"
      >
        <div className="flex items-center justify-between border-b border-base700 pb-2">
          <h3 className="text-2xl font-medium text-base100">{title}</h3>
          <Button variant="ghost" size="sm" onClick={closeModal}>
            <Icons.XCircle strokeWidth={1} />
          </Button>
        </div>
        <div className="py-2 text-base200">{content}</div>
        {(primaryHandler || secondaryHandler) && (
          <div className="py-2 border-t border-base700 flex justify-end items-center gap-3">
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
                onClick={() => {
                  primaryHandler();
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

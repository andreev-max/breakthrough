import { ReactNode, createContext, useContext, useState } from "react";

export interface ModalContentProps {
  title?: string;
  content: ReactNode | string;
  primaryHandler?: () => Promise<void>;
  secondaryHandler?: () => void;
}

export interface ModalContextProps {
  isModalOpen: boolean;
  openModal: (content: ModalContentProps) => void;
  closeModal: () => void;
  modalContent: ModalContentProps;
}

const ModalContext = createContext<ModalContextProps>({
  isModalOpen: false,
  openModal: ({
    title,
    content,
    primaryHandler,
    secondaryHandler,
  }: ModalContentProps) => {},
  closeModal: () => {},
  modalContent: {
    title: "",
    content: "",
    primaryHandler: () => Promise.resolve(),
    secondaryHandler: () => {},
  },
});

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentProps>({
    title: "",
    content: "",
    primaryHandler: () => Promise.resolve(),
    secondaryHandler: () => {},
  });

  const openModal = ({
    title,
    content,
    primaryHandler,
    secondaryHandler,
  }: ModalContentProps) => {
    setModalContent({
      title,
      content,
      primaryHandler,
      secondaryHandler,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        modalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

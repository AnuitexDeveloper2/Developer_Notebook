import React, { useState } from "react";

export interface ModalProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const useModalState = ({ initialOpen = false } = {}): ModalProps => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return { onOpen, onClose, isOpen, onToggle };
};

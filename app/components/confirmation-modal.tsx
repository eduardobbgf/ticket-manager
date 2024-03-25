import Button from "./button";
import React, { useState } from "react";

interface ConfirmationModalProps {
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end">
          <Button onClick={handleConfirm} buttonTitle="Confirm"></Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

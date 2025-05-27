import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AlertDialog.css";

interface ConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  title = "Are you absolutely sure?",
  message = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  cancelText = "Cancel",
  confirmText = "Yes, delete account",
}) => {

  const handleConfirm = () => {
    onConfirm();
    onCancel(); 
  } 

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modalDialog-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            className="modalDialog-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <h2 id="modal-title">{title}</h2>
            <p id="modal-description">{message}</p>
            <div className="modalDialog-actions">
              <button className="cancel-button" onClick={onCancel}>
                {cancelText}
              </button>
              <button className="delete-button" onClick={handleConfirm}>
                {confirmText}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

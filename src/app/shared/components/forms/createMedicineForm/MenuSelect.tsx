import { motion } from "framer-motion";
import React from "react";

interface MenuSelectProps {
  isWaiting: boolean;
  onSelectFromGallery: () => void;
  onTakePhoto: () => void;
  onCancel: () => void;
}

export const MenuSelect: React.FC<MenuSelectProps> = ({
  isWaiting,
  onSelectFromGallery,
  onTakePhoto,
  onCancel,
}) => {
  return (
    <motion.div
    onClick={(e) => e.stopPropagation()} // <--- Agregado aquí
    key="options-menu"
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    style={{
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      background: "#fff",
      borderTop: "1px solid #ccc",
      boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
      padding: "12px",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}
  >
  
      <button onClick={onSelectFromGallery}>📁 Galería</button>
      <button onClick={onTakePhoto}>
        {isWaiting ? "❌ Cancelar foto" : "📷 Tomar foto"}
      </button>
      <button  onClick={onCancel}>Cancelar</button>
    </motion.div>
  );
};

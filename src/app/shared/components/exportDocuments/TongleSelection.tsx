import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToggleSectionProps = {
  title?: string;
  children: React.ReactNode;
  onToggle?: (visible: boolean) => void;
};

export function ToggleSection({
  title = "Información",
  children,
  onToggle,
}: ToggleSectionProps) {
  const [isVisible, setIsVisible] = useState(true);

  const toggle = () => {
    setIsVisible((prev) => {
      const newVal = !prev;
      if (onToggle) onToggle(newVal);
      return newVal;
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <button
        onClick={toggle}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          alignItems: "center",
          gap: "5px",
          padding: "0px 10px",
          display: "flex",
        }}
      >
        {isVisible ? "Ocultar" : "Mostrar"} {title}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isVisible ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

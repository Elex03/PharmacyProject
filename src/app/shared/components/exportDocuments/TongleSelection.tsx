import { useRef, useState } from "react";

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
  const contentRef = useRef<HTMLDivElement>(null);

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
      <div
        ref={contentRef}
        style={{
          overflow: "hidden",
          height: isVisible ? "auto" : 0,
          transition: "height 0.5s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}

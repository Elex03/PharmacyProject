import { useEffect, useState } from "react";
import type { ReactourStep } from "reactour";

export const useTour = (storageKey: string, steps: ReactourStep[]) => {
  const [isTourOpen, setIsTourOpen] = useState(false);

  // ✅ SIN activar automáticamente
  useEffect(() => {
    const hasVisited = localStorage.getItem(`hasVisitedTour_${storageKey}`);
    if (!hasVisited) {
      localStorage.setItem(`hasVisitedTour_${storageKey}`, "false");
    }
  }, [storageKey]);

  const openTour = () => setIsTourOpen(true);
  const closeTour = () => setIsTourOpen(false);

  return {
    isTourOpen,
    openTour,
    closeTour,
    steps,
  };
};

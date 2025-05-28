import { useEffect, useState } from "react";
import type {ReactourStep} from 'reactour'


export const useTour = (storageKey: string, steps: ReactourStep[]) => {
  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem(`hasVisitedTour_${storageKey}`);
    if (!hasVisited) {
      setIsTourOpen(true);
      localStorage.setItem(`hasVisitedTour_${storageKey}`, "true");
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

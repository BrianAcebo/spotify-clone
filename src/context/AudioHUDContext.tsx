import { createContext } from "react";

export type HUDContextType = {
  showHUD: (message: string, volume?: number) => void;
  hudMessage: string | null;
  volumeLevel: number | null;
};

export const AudioHUDContext = createContext<HUDContextType | undefined>(undefined);

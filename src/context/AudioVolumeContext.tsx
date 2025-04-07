import { createContext } from "react";

export type VolumeContextType = {
  volume: number;
  setVolume: (v: number) => void;
  isMuted: boolean;
  toggleMute: () => boolean;
};

export const AudioVolumeContext = createContext<VolumeContextType | undefined>(undefined);

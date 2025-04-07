import React, { useState, useCallback } from "react";
import { AudioHUDContext } from "./AudioHUDContext";

export const AudioHUDProvider = ({ children }: { children: React.ReactNode }) => {
  const [hudMessage, setHudMessage] = useState<string | null>(null);
  const [volumeLevel, setVolumeLevel] = useState<number | null>(null);

  // Show the HUD message
  const showHUD = useCallback((message: string, volume?: number) => {
    setHudMessage(message);
    if (volume !== undefined) setVolumeLevel(volume);

    setTimeout(() => {
      setHudMessage(null);
      setVolumeLevel(null);
    }, 1500);
  }, []);

  return (
    <AudioHUDContext.Provider value={{ showHUD, hudMessage, volumeLevel }}>
      {children}
    </AudioHUDContext.Provider>
  );
};

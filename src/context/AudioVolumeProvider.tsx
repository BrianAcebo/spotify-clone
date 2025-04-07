import React, { useState, useCallback } from "react";
import { AudioVolumeContext } from "./AudioVolumeContext";

export const AudioVolumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [volume, setVolume] = useState(1);
  const [unmuteVolume, setUnmuteVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Set volume to updated volume amount
  const handleSetVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolume(clamped);
    if (clamped > 0) {
      setUnmuteVolume(clamped);
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  }, []);

  // Toggle mute and unmute
  const toggleMute = useCallback(() => {
    let newMuted = false;

    if (isMuted) {
      setVolume(unmuteVolume || 1);
      setIsMuted(false);
      newMuted = false;
    } else {
      setUnmuteVolume(volume);
      setVolume(0);
      setIsMuted(true);
      newMuted = true;
    }

    return newMuted;
  }, [isMuted, volume, unmuteVolume]);

  return (
    <AudioVolumeContext.Provider
      value={{
        volume,
        setVolume: handleSetVolume,
        isMuted,
        toggleMute,
      }}
    >
      {children}
    </AudioVolumeContext.Provider>
  );
};

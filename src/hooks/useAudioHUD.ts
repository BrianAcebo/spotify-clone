import { useContext } from "react";
import { AudioHUDContext } from "../context/AudioHUDContext";

const useAudioHUD = () => {
  const context = useContext(AudioHUDContext);
  if (!context) {
    throw new Error("useAudioHUD must be used within an AudioHUDProvider");
  }
  return context;
};

export default useAudioHUD;

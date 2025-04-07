import { useContext } from "react";
import { AudioVolumeContext } from "../context/AudioVolumeContext";

const useAudioVolume = () => {
  const context = useContext(AudioVolumeContext);
  if (!context) throw new Error("useAudioVolume must be used within AudioVolumeProvider");
  return context;
};

export default useAudioVolume;

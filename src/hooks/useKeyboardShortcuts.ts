import { useEffect } from "react";
import useAudioHUD from "./useAudioHUD";
import useAudioVolume from "../hooks/useAudioVolume";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  togglePlay: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleShuffle: () => void;
  handleRepeat: () => void;
};

const useKeyboardShortcuts = ({
  audioRef,
  togglePlay,
  handleNext,
  handlePrev,
  handleShuffle,
  handleRepeat,
}: Props) => {
  const { showHUD } = useAudioHUD();
  const { volume, setVolume, toggleMute } = useAudioVolume();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        (e.target as HTMLElement)?.tagName === "INPUT" ||
        (e.target as HTMLElement)?.tagName === "TEXTAREA"
      )
        return;

      switch (e.key.toLowerCase()) {
        case "arrowup": {
          e.preventDefault();
          const increased = Math.min(1, volume + 0.05);
          if (audioRef.current) audioRef.current.volume = increased;
          setVolume(increased);
          showHUD("Volume", increased);
          break;
        }
        case "arrowdown": {
          e.preventDefault();
          const decreased = Math.max(0, volume - 0.05);
          if (audioRef.current) audioRef.current.volume = decreased;
          setVolume(decreased);
          showHUD("Volume", decreased);
          break;
        }
        case "arrowright":
          e.preventDefault();
          if (audioRef.current) {
            audioRef.current.currentTime += 5;
            showHUD("Forward 5s");
          }
          break;
        case "arrowleft":
          e.preventDefault();
          if (audioRef.current) audioRef.current.currentTime -= 5;
          showHUD("Backward 5s");
          break;
        case " ":
          e.preventDefault();
          togglePlay();
          showHUD(audioRef.current?.paused ? "Paused" : "Playing");
          break;
        case "s":
          e.preventDefault();
          handleShuffle();
          showHUD("Shuffle Toggled");
          break;
        case "r":
          e.preventDefault();
          handleRepeat();
          showHUD("Repeat Toggled");
          break;
        case "n":
          e.preventDefault();
          handleNext();
          showHUD("Next Track");
          break;
        case "p":
          e.preventDefault();
          handlePrev();
          showHUD("Previous Track");
          break;
        case "m": {
          e.preventDefault();
          const nowMuted = toggleMute();
          showHUD(nowMuted ? "Muted" : "Unmuted");
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [
    audioRef,
    togglePlay,
    handleNext,
    handlePrev,
    handleShuffle,
    handleRepeat,
    showHUD,
    setVolume,
    toggleMute,
    volume,
  ]);
};

export default useKeyboardShortcuts;

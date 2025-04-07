import { useEffect } from "react";
import { LuVolume2 } from "react-icons/lu";
import { GrVolumeMute } from "react-icons/gr";
import Tooltip from "../ui/Tooltip";
import useAudioVolume from "../../hooks/useAudioVolume";

const AudioVolume = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement | null> }) => {
  const { volume, setVolume, isMuted, toggleMute } = useAudioVolume();

  // Update volume on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Set volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [audioRef, volume]);

  const percent = volume * 100;

  return (
    <div className="group flex w-32 items-center gap-2">
      <Tooltip position="top" text={isMuted ? "Unmute" : "Mute"} className="hidden sm:flex">
        <button
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute" : "Mute"}
          onClick={toggleMute}
        >
          {isMuted ? (
            <GrVolumeMute className="size-5 text-white/60" />
          ) : (
            <LuVolume2 className="size-5 text-white/60" />
          )}
        </button>
      </Tooltip>

      <div className="relative flex h-4 w-full items-center">
        <div className="bg-brand-black-400 pointer-events-none absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded">
          <div
            className="absolute h-1 rounded bg-white transition-colors duration-200 group-hover:bg-green-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleChange}
          className="[&::-moz-range-thumb]:box-shadow-none z-10 w-full appearance-none bg-transparent [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:opacity-0 [&::-moz-range-thumb]:ring-0 [&::-moz-range-thumb]:transition-opacity [&::-moz-range-thumb]:outline-none group-hover:[&::-moz-range-thumb]:opacity-100 [&::-moz-range-track]:h-1 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:shadow-none [&::-webkit-slider-thumb]:ring-0 [&::-webkit-slider-thumb]:transition-opacity [&::-webkit-slider-thumb]:outline-none group-hover:[&::-webkit-slider-thumb]:opacity-100"
        />
      </div>
    </div>
  );
};

export default AudioVolume;

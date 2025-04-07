import React, { useState, useEffect } from "react";
import { useAudio } from "../../hooks/useAudio";
import { formatTime } from "../../utils";

const AudioProgress = ({
  audioRef,
  isPlaying,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
}) => {
  const { selectedTrack } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Update time on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setCurrentTime(value);
  };

  // Move time progress bar forward per second
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    if (isPlaying) {
      const interval = setInterval(updateProgress, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, audioRef]);

  // Prevent from accidentally going past song's duration
  const safeDuration = Math.max(selectedTrack?.duration || duration || 0, 1);

  // Progress percent amount for visual styling
  const percent = Math.min(100, Math.max(0, (currentTime / safeDuration) * 100));

  return (
    <div className="group flex w-full items-center gap-1 px-4">
      <span className="w-8 text-xs text-gray-400">{formatTime(currentTime)}</span>

      <div className="relative flex h-4 w-full items-center">
        <div className="bg-brand-black-400 pointer-events-none absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded">
          <div
            className="absolute h-1 rounded bg-white transition-colors duration-200 group-hover:bg-green-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <input
          min="0"
          max={selectedTrack?.duration || duration}
          value={currentTime}
          onChange={handleChange}
          type="range"
          className="[&::-moz-range-thumb]:box-shadow-none z-10 w-full appearance-none bg-transparent [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:opacity-0 [&::-moz-range-thumb]:ring-0 [&::-moz-range-thumb]:transition-opacity [&::-moz-range-thumb]:outline-none group-hover:[&::-moz-range-thumb]:opacity-100 [&::-moz-range-track]:h-1 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:shadow-none [&::-webkit-slider-thumb]:ring-0 [&::-webkit-slider-thumb]:transition-opacity [&::-webkit-slider-thumb]:outline-none group-hover:[&::-webkit-slider-thumb]:opacity-100"
        />
      </div>

      <span className="w-10 text-xs text-gray-400">
        {formatTime(selectedTrack?.duration || duration)}
      </span>
    </div>
  );
};

export default AudioProgress;

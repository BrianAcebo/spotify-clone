import { useAudio } from "../hooks/useAudio";
import { HiPause, HiPlay } from "react-icons/hi2";
import { useEffect, useState, useCallback } from "react";
import AudioProgress from "../components/audio/AudioProgress";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { LuShuffle } from "react-icons/lu";
import { BiRepeat } from "react-icons/bi";
import Tooltip from "../components/ui/Tooltip";
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";
import type { Track } from "../types/audio";

const AudioControls = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement | null> }) => {
  const { selectedTrack, setSelectedTrack, selectedPlaylist } = useAudio();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [playHistory, setPlayHistory] = useState<Track[]>([]); // Track order history of what was played

  // Toggle play or pause
  const togglePlay = useCallback(() => {
    if (!selectedTrack) return;
    const next = !isPlaying;
    setIsPlaying(next);
    setSelectedTrack({ ...selectedTrack, isPlaying: next });
    if (next) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [selectedTrack, isPlaying, setSelectedTrack, audioRef]);

  // The index of the selected track
  const getCurrentTrackIndex = useCallback(() => {
    return selectedPlaylist?.tracks.findIndex(({ name }) => name === selectedTrack?.name);
  }, [selectedPlaylist, selectedTrack]);

  // Change next track
  const handleNext = useCallback(() => {
    if (!selectedPlaylist || !selectedTrack) return;
    const i = getCurrentTrackIndex() ?? 0;
    let nextTrack;

    if (isShuffle) {
      // If shuffle is on select a random track
      const others = selectedPlaylist.tracks.filter((_, index) => index !== i);
      nextTrack = others[Math.floor(Math.random() * others.length)];
    } else {
      // If not select the next or first track if the current is the last
      const nextIndex = i === selectedPlaylist.tracks.length - 1 ? 0 : i + 1;
      nextTrack = selectedPlaylist.tracks[nextIndex];
    }

    // Store in order history
    setPlayHistory((prev) => [...prev, selectedTrack]);

    // Play new track
    setSelectedTrack({ ...nextTrack, isPlaying: true });
  }, [selectedPlaylist, selectedTrack, isShuffle, getCurrentTrackIndex, setSelectedTrack]);

  // Change to previous track
  const handlePrev = useCallback(() => {
    if (!selectedTrack) return;

    // If passed 2 seconds then restart track
    if (audioRef.current && audioRef.current.currentTime > 2) {
      audioRef.current.currentTime = 0;
      return;
    }

    if (playHistory.length > 0) {
      // Go back to the previous in track history
      const last = playHistory[playHistory.length - 1];
      setPlayHistory((prev) => prev.slice(0, prev.length - 1));
      setSelectedTrack({ ...last, isPlaying: true });
    } else if (selectedPlaylist) {
      // Go to previous track in track list or stop at first track
      const i = getCurrentTrackIndex() ?? 0;
      const fallback = i > 0 ? i - 1 : 0;
      setSelectedTrack({ ...selectedPlaylist.tracks[fallback], isPlaying: true });
    }
  }, [
    selectedTrack,
    selectedPlaylist,
    playHistory,
    getCurrentTrackIndex,
    setSelectedTrack,
    audioRef,
  ]);

  // Methods
  const handleShuffle = () => setIsShuffle((prev) => !prev);
  const handleRepeat = () => setIsRepeat((prev) => !prev);

  useEffect(() => {
    // Play selected track if user had it playing
    if (selectedTrack?.isPlaying) {
      setIsPlaying(true);
      audioRef.current?.play();
    } else {
      // Pause the selected track
      setIsPlaying(false);
      audioRef.current?.pause();
    }
  }, [selectedTrack, audioRef]);

  // Replay track if repeat is on
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set to zero or go to next song
    const onEnd = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener("ended", onEnd);
    return () => audio.removeEventListener("ended", onEnd);
  }, [audioRef, isRepeat, handleNext, selectedTrack]);

  // Keyboard support
  useKeyboardShortcuts({
    audioRef,
    togglePlay,
    handleNext,
    handlePrev,
    handleShuffle,
    handleRepeat,
  });

  if (!selectedTrack) return null;

  return (
    <div className="right-0 left-0 mx-auto mt-2 flex w-4/5 max-w-lg flex-col items-center justify-center gap-2 sm:w-4/6 md:mt-0 lg:absolute">
      <div className="flex items-center gap-5">
        <Tooltip position="top" text={`${isShuffle ? "Disable" : "Enable"} shuffle`}>
          <button onClick={handleShuffle}>
            <LuShuffle className={`${isShuffle ? "text-brand-green" : "text-white/60"} size-5`} />
          </button>
        </Tooltip>

        <Tooltip position="top" text="Previous">
          <button onClick={handlePrev}>
            <GiPreviousButton className="size-5 text-white/60 hover:text-white" />
          </button>
        </Tooltip>

        <Tooltip position="top" text={isPlaying ? "Pause" : "Play"}>
          <button
            onClick={togglePlay}
            className="flex size-8 items-center justify-center rounded-full bg-white hover:scale-105"
          >
            {isPlaying ? (
              <HiPause className="text-brand-black-700 size-5" />
            ) : (
              <HiPlay className="text-brand-black-700 size-4.5" />
            )}
          </button>
        </Tooltip>

        <Tooltip position="top" text="Next">
          <button onClick={handleNext}>
            <GiNextButton className="size-5 text-white/60 hover:text-white" />
          </button>
        </Tooltip>

        <Tooltip position="top" text={`${isRepeat ? "Disable" : "Enable"} repeat`}>
          <button onClick={handleRepeat}>
            <BiRepeat
              className={`${isRepeat ? "text-brand-green" : "text-white/60"} size-5 rotate-180`}
            />
          </button>
        </Tooltip>
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <AudioProgress audioRef={audioRef} isPlaying={isPlaying} />
      </div>
    </div>
  );
};

export default AudioControls;

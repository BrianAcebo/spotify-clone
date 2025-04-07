import { useAudio } from "../hooks/useAudio";
import AudioControls from "../context/AudioControls";
import { useRef, useEffect, useState } from "react";
import { BsFilePlay } from "react-icons/bs";
import Tooltip from "./ui/Tooltip";
import { TbMicrophone2 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { LuMonitorSpeaker } from "react-icons/lu";
import { CgMiniPlayer } from "react-icons/cg";
import { MdOpenInFull } from "react-icons/md";
import AudioVolume from "./audio/AudioVolume";
import { FiPlusCircle } from "react-icons/fi";

const Footer = () => {
  const { selectedPlaylist, selectedTrack } = useAudio();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const footerRef = useRef<HTMLElement>(null);

  const [isSpeakerView, setIsSpeakerView] = useState<boolean>(false);
  const [isLyrics, setIsLyrics] = useState<boolean>(false);
  const [isQueue, setIsQueue] = useState<boolean>(false);
  const [isDevice, setIsDevice] = useState<boolean>(false);
  const [isMiniPlayer, setIsMiniPlayer] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Set CSS variable of footer's height
  useEffect(() => {
    const waitForFooter = () => {
      const el = footerRef.current;
      if (!el) {
        requestAnimationFrame(waitForFooter);
        return;
      }

      const updateHeight = () => {
        const height = el.offsetHeight;
        document.documentElement.style.setProperty("--footer-height", `${height}px`);
      };

      updateHeight();

      const observer = new ResizeObserver(updateHeight);
      observer.observe(el);

      window.addEventListener("load", updateHeight);

      return () => {
        observer.disconnect();
        window.removeEventListener("load", updateHeight);
      };
    };

    waitForFooter();
  }, []);

  if (!selectedTrack || !selectedPlaylist) return;

  return (
    <>
      <footer ref={footerRef} className="w-full shrink-0 rounded-lg px-2 py-4">
        <audio className="hidden" ref={audioRef} src={selectedTrack.url} preload="metadata"></audio>

        <div className="relative z-50 flex flex-col items-center justify-between lg:flex-row">
          <div className="bg-brand-black-500 mb-1 flex w-full items-center justify-center rounded-xl p-2 lg:mb-0 lg:w-1/5 lg:justify-start lg:bg-transparent">
            <img
              src={selectedTrack.image}
              alt={selectedTrack.name}
              loading="eager"
              className="mr-2 size-9 rounded-md object-cover lg:mr-4 lg:size-14"
            />

            <div className="flex flex-col">
              <a className="cursor-pointer text-sm font-[400] text-white hover:underline">
                {selectedTrack.name}
              </a>
              <a className="cursor-pointer text-xs font-[400] text-gray-400 transition-colors group-hover:text-white hover:underline">
                {selectedPlaylist.artist}
              </a>
            </div>

            <Tooltip position="top" text="Add to Liked Songs">
              <button title="Add to Liked Songs" aria-label="Add to Liked Songs">
                <FiPlusCircle className="ml-4 size-4 cursor-pointer text-white/60 transition-colors hover:text-white" />
              </button>
            </Tooltip>
          </div>

          <AudioControls audioRef={audioRef} />

          <div className="hidden w-1/5 items-center gap-3 lg:flex">
            <Tooltip position="top" text="Now playing view" className="hidden sm:flex">
              <button
                title="Now playing view"
                aria-label="Now playing view"
                onClick={() => setIsSpeakerView(!isSpeakerView)}
              >
                <BsFilePlay
                  className={`${
                    isSpeakerView ? "text-brand-green" : "text-white/60"
                  } size-5 cursor-pointer transition-colors hover:text-white`}
                />
              </button>
            </Tooltip>

            <Tooltip position="top" text="Lyrics" className="hidden sm:flex">
              <button title="Lyrics" aria-label="Lyrics" onClick={() => setIsLyrics(!isLyrics)}>
                <TbMicrophone2
                  className={`${
                    isLyrics ? "text-brand-green" : "text-white/60"
                  } size-5 cursor-pointer transition-colors hover:text-white`}
                />
              </button>
            </Tooltip>

            <Tooltip position="top" text="Queue" className="hidden sm:flex">
              <button title="Queue" aria-label="Queue" onClick={() => setIsQueue(!isQueue)}>
                <HiOutlineQueueList
                  className={`${
                    isQueue ? "text-brand-green" : "text-white/60"
                  } size-5 cursor-pointer transition-colors hover:text-white`}
                />
              </button>
            </Tooltip>

            <Tooltip position="top" text="Connect to a device" className="hidden sm:flex">
              <button
                title="Connect to a device"
                aria-label="Connect to a device"
                onClick={() => setIsDevice(!isDevice)}
              >
                <LuMonitorSpeaker
                  className={`${
                    isDevice ? "text-brand-green" : "text-white/60"
                  } size-5 cursor-pointer transition-colors hover:text-white`}
                />
              </button>
            </Tooltip>

            <AudioVolume audioRef={audioRef} />

            <Tooltip position="topRight" text="Open Miniplayer" className="hidden sm:flex">
              <button
                title="Open Miniplayer"
                aria-label="Open Miniplayer"
                onClick={() => setIsMiniPlayer(!isMiniPlayer)}
              >
                <CgMiniPlayer
                  className={`${
                    isMiniPlayer ? "text-brand-green" : "text-white/60"
                  } size-5 cursor-pointer transition-colors hover:text-white`}
                />
              </button>
            </Tooltip>

            <Tooltip position="topRight" text="Full screen" className="hidden sm:flex">
              <button
                title="Full screen"
                aria-label="Full screen"
                onClick={() => setIsFullScreen(!isFullScreen)}
              >
                <MdOpenInFull
                  className={`${
                    isFullScreen ? "text-brand-green" : "text-white/60"
                  } size-5 cursor-pointer transition-colors hover:text-white`}
                />
              </button>
            </Tooltip>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

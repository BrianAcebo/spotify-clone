import Tooltip from "./ui/Tooltip";
import { IoCloseOutline } from "react-icons/io5";
import { FaEllipsis } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import { useAudio } from "../hooks/useAudio";

const TrackDisplay = () => {
  const { selectedTrack, selectedPlaylist, playlists } = useAudio();

  if (!selectedTrack || !selectedPlaylist) {
    return <p>Nothing selected</p>;
  }

  return (
    <div className="bg-brand-black-600 z-10 hidden w-[29%] flex-col rounded-lg lg:flex">
      <div className="relative z-10 size-full">
        <img
          src={selectedTrack.image}
          alt={`Image cover of ${selectedTrack.name} `}
          loading="eager"
          className="absolute z-0 size-full rounded-t-lg rounded-b-xl object-cover"
        ></img>
        <div className="from-brand-black-600 absolute inset-0 z-10 size-full rounded-lg bg-gradient-to-t to-transparent"></div>

        <div className="relative z-20 flex h-full flex-col justify-between px-4 pt-3 pb-5">
          <div className="flex items-center justify-between px-1">
            <a className="tracking-tightest cursor-pointer text-lg font-semibold text-white hover:underline">
              {playlists.find((playlist) => playlist.id === selectedTrack.playlist)?.name}
            </a>

            <div className="flex items-center gap-2">
              <Tooltip position="topRight" text={`More options for ${selectedTrack.name}`}>
                <button
                  title={`More options for ${selectedTrack.name}`}
                  className="hover:bg-brand-black-500 group flex cursor-pointer items-center justify-between gap-1 rounded-full p-2"
                  aria-label={`More options for ${selectedTrack.name}`}
                >
                  <FaEllipsis className="size-5 transition-colors group-hover:text-white"></FaEllipsis>
                </button>
              </Tooltip>

              <Tooltip position="topRight" text="Doesn't actually close">
                <button
                  title="Doesn't actually close"
                  className="hover:bg-brand-black-500 group flex cursor-pointer items-center justify-between gap-1 rounded-full p-2"
                  aria-label="Doesn't actually close"
                >
                  <IoCloseOutline className="size-5 transition-colors group-hover:text-white"></IoCloseOutline>
                </button>
              </Tooltip>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <a className="cursor-pointer text-3xl font-semibold hover:underline">
                {selectedTrack.name}
              </a>
              <a className="cursor-pointer text-gray-400 hover:underline">
                {selectedPlaylist.artist}
              </a>
            </div>

            <Tooltip position="topRight" text="Add to liked songs">
              <button
                title="More options for current song"
                className="bg-brand-green flex cursor-pointer items-center justify-between rounded-full p-1 hover:scale-105"
                aria-label="More options for current song"
              >
                <IoCheckmark className="text-brand-black-500 size-4 transition-colors"></IoCheckmark>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDisplay;

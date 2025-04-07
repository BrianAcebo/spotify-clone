import { useAudio } from "../hooks/useAudio";
import { HiPause } from "react-icons/hi2";
import { HiPlay } from "react-icons/hi2";
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { JSX } from "react";
import { GrMenu } from "react-icons/gr";
import { HiHashtag } from "react-icons/hi2";
import { GoClock } from "react-icons/go";
import { formatTime } from "../utils";
import Tooltip from "./ui/Tooltip";
import { FaEllipsis } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import audioLevels from "../assets/audioLevels.gif";
import type { Track } from "../types/audio";
import { FaArrowLeftLong } from "react-icons/fa6";

type SortOption = {
  name: string;
  icon: JSX.Element;
};

const PlaylistDisplay = ({
  playlistDisplayIsOpen,
  togglePlaylistDisplay,
}: {
  playlistDisplayIsOpen: boolean;
  togglePlaylistDisplay: (option: boolean) => void;
}) => {
  const { selectedPlaylist, selectedTrack, setSelectedTrack } = useAudio();

  // Sort class
  const sortOptionClass = "size-4.5";

  // Sorting options
  const sortOptions: SortOption[] = [
    {
      name: "List",
      icon: <TfiMenuAlt className={sortOptionClass} />,
    },
    {
      name: "Compact",
      icon: <GrMenu className={sortOptionClass} />,
    },
  ];

  // Sorting options state
  const [sortMenuIsOpen, setSortMenuIsOpen] = useState<boolean>(false);
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(sortOptions[0]);

  // Toggle sort dropdown menu
  const toggleSortMenu = () => {
    setSortMenuIsOpen(!sortMenuIsOpen);
  };

  // Toggle audio
  const toggleAudio = () => {
    if (!selectedTrack) return;
    setSelectedTrack({ ...selectedTrack, isPlaying: !selectedTrack.isPlaying });
  };

  // No playlist selected
  if (!selectedPlaylist) {
    return <p>Nothing selected</p>;
  }

  return (
    <div
      className={`to-bg-brand-black-600 no-scrollbar top-0 z-10 flex w-full flex-col overflow-x-hidden overflow-y-auto overscroll-contain rounded-lg bg-gradient-to-b from-indigo-900 via-indigo-900 transition-all duration-300 lg:visible lg:static lg:w-[42.5%] lg:opacity-100 ${playlistDisplayIsOpen ? "visible right-0 opacity-100" : "invisible fixed -right-[100vw] opacity-0"}`}
    >
      <div className="relative w-full bg-gradient-to-b from-indigo-400 via-violet-500 to-indigo-900">
        <div className="absolute inset-0 z-0 size-full bg-gradient-to-b from-black/40 to-black/45"></div>

        <div className="relative z-10 px-3 pt-6 pb-2 md:px-5 md:pt-10">
          <button
            className="relative z-20 mb-5 block cursor-pointer lg:hidden"
            onClick={() => togglePlaylistDisplay(false)}
          >
            <FaArrowLeftLong className="size-5 text-white" />
          </button>

          <div className="flex items-stretch gap-3">
            <img
              src={selectedPlaylist.thumbnail}
              alt={`Image cover of ${selectedPlaylist.name} `}
              loading="eager"
              className="shadow-brand-black size-16 rounded-md object-cover shadow-lg md:h-33 md:w-32"
            ></img>

            <div className="flex flex-col justify-between pb-1">
              <hgroup className="-mt-1">
                <p className="mb-1 text-sm">Playlist</p>
                <h1 className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
                  {selectedPlaylist.name}
                </h1>
              </hgroup>

              <p className="flex items-center gap-[1px] text-sm">
                <a
                  className="mr-1 font-semibold text-white hover:underline"
                  href="https://brianacebo.com"
                  target="_blank"
                >
                  {selectedPlaylist.artist}
                </a>
                <span className="text-gray-300">
                  &#8226; {selectedPlaylist.tracks.length} songs
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 flex flex-col justify-between px-4 pt-3 pb-5">
        <div className="to-brand-black-600 absolute inset-0 z-0 size-full bg-gradient-to-b from-black/45"></div>

        <div className="relative z-10 mt-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {selectedPlaylist.tracks.find(
                (track: Track) => track.name === selectedTrack?.name,
              ) ? (
                <button
                  onClick={toggleAudio}
                  className="bg-brand-green flex size-8 cursor-pointer items-center justify-center rounded-full md:size-14"
                >
                  {selectedTrack?.isPlaying ? (
                    <HiPause className="text-brand-black-700 size-4 md:size-7" />
                  ) : (
                    <HiPlay className="text-brand-black-700 size-4 md:size-7" />
                  )}
                </button>
              ) : (
                <button
                  onClick={() =>
                    setSelectedTrack({ ...selectedPlaylist.tracks[0], isPlaying: true })
                  }
                  className="bg-brand-green flex size-14 cursor-pointer items-center justify-center rounded-full"
                >
                  <HiPlay className="text-brand-black-700 size-7" />
                </button>
              )}

              <Tooltip position="topLeft" text={`More options for ${selectedPlaylist.name}`}>
                <button
                  title={`More options for ${selectedPlaylist.name}`}
                  className="hover:bg-brand-black-500 group flex cursor-pointer items-center justify-between gap-1 rounded-full p-2"
                  aria-label={`More options for ${selectedPlaylist.name}`}
                >
                  <FaEllipsis className="size-5 text-gray-400 transition-colors group-hover:text-white"></FaEllipsis>
                </button>
              </Tooltip>
            </div>

            <div className="relative">
              <button
                title="Sort playlists"
                className="group flex min-w-12 cursor-pointer items-center justify-between gap-2 rounded-full px-2 py-2 hover:scale-105"
                aria-label="Sort playlists"
                onClick={toggleSortMenu}
              >
                <span className="text-sm text-gray-400 transition-all group-hover:text-white">
                  {selectedSortOption.name}
                </span>
                <span className="!size-4 !text-gray-400 !transition-all group-hover:!text-white">
                  {selectedSortOption.icon}
                </span>
              </button>

              <div
                className={`${sortMenuIsOpen ? "block" : "hidden"} bg-brand-black-500 absolute right-2 z-20 mt-2 w-fit min-w-40 items-center justify-end gap-0 rounded-md px-1 py-3 shadow transition-all`}
              >
                <small className="px-2 text-xs text-gray-400 md:px-3">Sort by</small>
                <ul className="mt-1 md:mt-2">
                  {sortOptions.map((option, i) => (
                    <li
                      className="w-full p-2 transition-colors hover:bg-gray-500/20 md:p-3"
                      key={i}
                    >
                      <button
                        className={`flex w-full items-center justify-between gap-2 text-sm wrap-normal ${option.name === selectedSortOption.name ? "text-brand-green" : "text-gray-200"}`}
                        onClick={() => {
                          setSelectedSortOption({ ...option });
                        }}
                      >
                        <span className="flex items-center gap-3">
                          {option.icon}
                          {option.name}
                        </span>

                        {option.name === selectedSortOption.name && (
                          <IoCheckmark className="text-brand-green ml-2 size-5" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-brand-black-600 relative z-10 flex h-fit flex-col justify-between pb-5 md:px-4">
        <div className="w-full">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="w-3/4 px-3 py-2 text-left md:w-1/2 md:px-5">
                  <div className="flex items-center gap-3">
                    <HiHashtag className="size-3.5 text-gray-400 max-md:hidden" />
                    <p className="text-sm font-[400] text-gray-400">Title</p>
                  </div>
                </th>
                <th className="w-1/4 py-2 pl-2 text-left max-md:hidden">
                  <p className="text-sm font-[400] text-gray-400">Album</p>
                </th>
                <th className="w-1/4 py-2 pr-5 text-right md:pr-10">
                  <GoClock className="ml-auto size-4.5 text-gray-400" />
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={3} className="h-4"></td>
              </tr>
              {/* spacing row */}
              {selectedPlaylist.tracks.map((track: Track, i: number) => (
                <tr key={i}>
                  <td colSpan={3}>
                    <button
                      onClick={() => setSelectedTrack({ ...track, isPlaying: true })}
                      className="group hover:bg-brand-black-400 relative flex w-full items-center rounded-md bg-transparent py-1.5 pl-2 transition-colors duration-150 md:pl-4"
                    >
                      <div className="flex w-3/4 items-center text-left md:w-1/2 md:pl-2">
                        <div
                          className={`-ml-1 hidden md:block ${track.name === selectedTrack?.name ? "text-brand-green group-hover:w-4" : "w-2 text-gray-400"}`}
                        >
                          {track.name === selectedTrack?.name && selectedTrack.isPlaying ? (
                            <img
                              src={audioLevels}
                              alt="Changing audio levels"
                              loading="eager"
                              className="-ml-1 size-5 group-hover:hidden"
                            />
                          ) : (
                            <span className="w-2 group-hover:hidden">{i + 1}</span>
                          )}
                          <span
                            onClick={toggleAudio}
                            className="-ml-1.5 hidden w-2 group-hover:block"
                          >
                            {track.name === selectedTrack?.name && selectedTrack?.isPlaying ? (
                              <HiPause className="size-5 text-white" />
                            ) : (
                              <HiPlay className="size-5 text-white" />
                            )}
                          </span>
                        </div>
                        <img
                          src={track.image}
                          alt={track.name}
                          loading="eager"
                          className={`${track.name === selectedTrack?.name ? "md:ml-3" : "md:ml-5"} mr-3 size-10 rounded-md object-cover`}
                        />
                        <div className="flex flex-col">
                          <a
                            className={`w-42 cursor-pointer overflow-hidden text-sm overflow-ellipsis whitespace-nowrap hover:underline md:text-base ${track.name === selectedTrack?.name ? "text-brand-green" : "text-white"} font-[400]`}
                          >
                            {track.name}
                          </a>
                          <a className="w-42 cursor-pointer overflow-hidden text-xs font-[400] overflow-ellipsis whitespace-nowrap text-gray-400 transition-colors group-hover:text-white hover:underline md:text-sm">
                            {selectedPlaylist.artist}
                          </a>
                        </div>
                      </div>

                      <div className="hidden w-1/4 text-left md:block">
                        <a className="cursor-pointer text-sm font-[400] text-gray-400 transition-colors group-hover:text-white hover:underline">
                          {selectedPlaylist.name}
                        </a>
                      </div>

                      <div className="flex w-1/4 items-center justify-end gap-8 pr-4 text-right md:pr-9">
                        <FiPlusCircle className="hidden size-5 cursor-pointer text-gray-400 transition-colors group-hover:block hover:scale-105 hover:text-white" />

                        <p className="w-8 text-center text-sm font-[400] text-white/70">
                          {formatTime(track.duration)}
                        </p>
                      </div>

                      <FaEllipsis className="absolute right-3 hidden size-4 cursor-pointer text-gray-400 transition-colors hover:scale-105 hover:text-white md:group-hover:block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDisplay;

import Tooltip from "./ui/Tooltip";
import { AiOutlinePlus } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi2";
import Pill from "./ui/Pill";
import { GoSearch } from "react-icons/go";
import { useState, useRef, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { GrMenu } from "react-icons/gr";
import { TfiMenuAlt } from "react-icons/tfi";
import { CgMenuGridR } from "react-icons/cg";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import type { JSX } from "react";
import { PiBellSimpleFill } from "react-icons/pi";
import { HiPause } from "react-icons/hi2";
import { HiPlay } from "react-icons/hi2";
import { cleanInput } from "../utils";
import { useAudio } from "../hooks/useAudio";
import type { Playlist, Track } from "../types/audio";

type LayoutOption = {
  name: string;
  icon: JSX.Element;
};

const PlaylistLibrary = ({
  playlistDisplayIsOpen,
  togglePlaylistDisplay,
}: {
  playlistDisplayIsOpen: boolean;
  togglePlaylistDisplay: (option: boolean) => void;
}) => {
  const { playlists, selectedPlaylist, setSelectedPlaylist, selectedTrack, setSelectedTrack } =
    useAudio();

  // Layout class
  const layoutOptionClass = "size-4.5 text-gray-400 transition-colors group-hover:text-white";

  // Sort and layout options
  const sortOptions: string[] = ["Recents", "Recently Added", "Alphabetical", "Creator"];
  const layoutOptions: LayoutOption[] = [
    {
      name: "Compact list",
      icon: <GrMenu className={layoutOptionClass} />,
    },
    {
      name: "Default list",
      icon: <TfiMenuAlt className={layoutOptionClass} />,
    },
    {
      name: "Compact grid",
      icon: <CgMenuGridR className={layoutOptionClass} />,
    },
    {
      name: "Default grid",
      icon: <HiOutlineSquares2X2 className={layoutOptionClass} />,
    },
  ];

  // Copy of playlists to mutate for filtering
  const [copyOfPlaylists, setCopyOfPlaylists] = useState<typeof playlists>([]);
  useEffect(() => {
    setCopyOfPlaylists([...playlists]);
  }, [playlists]);

  // Dropdown sort state
  const [sortMenuIsOpen, setSortMenuIsOpen] = useState<boolean>(false);
  const [selectedSortOption, setSelectedSortOption] = useState<string>(sortOptions[0]);
  const [selectedLayoutOption, setSelectedLayoutOption] = useState<LayoutOption["name"]>(
    layoutOptions[1].name,
  );

  // Search state
  const [searchBoxIsOpen, setSearchBoxIsOpen] = useState<boolean>(false);
  const [inputTimeout, setInputTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Toggle sort dropdown menu
  const toggleSortMenu = () => {
    setSortMenuIsOpen(!sortMenuIsOpen);
  };

  // Debounce input
  const handleInputChange = (input: HTMLInputElement, cb: (value: string) => void) => {
    if (inputTimeout) clearTimeout(inputTimeout);

    setInputTimeout(
      setTimeout(() => {
        cb(input.value);

        // Set search query to user input
        setSearchQuery(input.value);
      }, 500),
    );
  };

  // Filter playlists
  const filterPlaylists = async (query: string) => {
    query = cleanInput(query);
    if (!query) {
      setCopyOfPlaylists([...playlists]);
    }

    setCopyOfPlaylists(
      playlists.filter(
        ({ name, tracks }: { name: Playlist["name"]; tracks: Playlist["tracks"] }) => {
          return (
            name.toLowerCase().includes(query.toLowerCase()) ||
            tracks.some((track: Playlist["tracks"][0]) =>
              track.name.toLowerCase().includes(query.toLowerCase()),
            ) ||
            tracks.length === parseInt(query)
          );
        },
      ),
    );
  };

  const PlaylistContainer = ({ playlist }: { playlist: Playlist }) => {
    return (
      <div className={`flex items-center gap-3 ${playlistDisplayIsOpen ? "w-full" : "w-3/4"}`}>
        <button
          onClick={() => {
            if (!selectedTrack) return;
            if (playlist.tracks.find((track: Track) => track.name === selectedTrack?.name)) {
              setSelectedTrack({ ...selectedTrack, isPlaying: !selectedTrack?.isPlaying });
            } else {
              setSelectedTrack({ ...playlist.tracks[0], isPlaying: true });
            }
          }}
          className="relative z-0 hidden h-12 w-12 overflow-hidden rounded-sm lg:block"
        >
          <img src={playlist.thumbnail} alt={playlist.name} className="size-full object-cover" />
          <div className="bg-brand-black-500/40 absolute top-0 left-0 hidden h-full w-full items-center justify-center transition-opacity group-hover:flex">
            {playlist.tracks.find(
              (track: Track) => track.name === selectedTrack?.name && selectedTrack.isPlaying,
            ) ? (
              <HiPause className="size-3/5 text-white" />
            ) : (
              <HiPlay className="size-1/2 text-white" />
            )}
          </div>
        </button>

        <Tooltip position="topLeft" text={playlist.name} className="lg:hidden">
          <button
            aria-label={playlist.name}
            title={playlist.name}
            onClick={() => setSelectedPlaylist(playlist)}
            className="relative z-0 block size-8 cursor-pointer overflow-hidden rounded-sm md:size-12"
          >
            <img src={playlist.thumbnail} alt={playlist.name} className="size-full object-cover" />
          </button>
        </Tooltip>

        {/* Desktop */}
        <div
          onClick={() => setSelectedPlaylist(playlist)}
          className="hidden w-full flex-col items-start font-[400] lg:flex"
        >
          <p
            className={`${playlist.id === selectedPlaylist?.id ? "text-brand-green" : "text-gray-200"}`}
          >
            {playlist.name}
          </p>
          <p className="text-sm text-gray-400">Playlist &#8226; {playlist.tracks.length} songs</p>
        </div>

        {/* Mobile */}
        <div
          onClick={() => {
            setSelectedPlaylist(playlist);
            togglePlaylistDisplay(true);
          }}
          className={`flex w-full flex-col items-start font-[400] lg:hidden ${playlistDisplayIsOpen ? "hidden" : ""}`}
        >
          <p
            className={`${playlist.id === selectedPlaylist?.id ? "text-brand-green" : "text-gray-200"}`}
          >
            {playlist.name}
          </p>
          <p className="text-sm text-gray-400">Playlist &#8226; {playlist.tracks.length} songs</p>
        </div>
      </div>
    );
  };

  const Playlists = () => {
    return (
      <ul className="flex flex-col gap-2">
        {copyOfPlaylists.map((playlist, i) => (
          <li
            className={`${playlist.id === selectedPlaylist?.id && !playlistDisplayIsOpen ? "bg-gray-500/20" : ""} group flex cursor-pointer items-center justify-between gap-2 rounded-md p-1 transition-colors hover:bg-gray-500/20 md:-mx-2 md:p-2`}
            key={i}
          >
            <PlaylistContainer playlist={playlist} />

            {playlist.tracks.find(
              (track: Track) => track.name === selectedTrack?.name && selectedTrack.isPlaying,
            ) && (
              <PiBellSimpleFill
                className={`text-brand-green mr-2 size-5 -rotate-90 ${playlistDisplayIsOpen ? "hidden" : ""}`}
              ></PiBellSimpleFill>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className={`bg-brand-black-600 flex flex-col overflow-y-visible rounded-lg lg:w-[28.5%] ${playlistDisplayIsOpen ? "w-fit px-1 py-3 md:px-2 md:py-4" : "w-full px-3 py-2 md:px-4 md:py-3"}`}
    >
      <Tooltip position="topLeft" text="Create a playlist">
        <button
          title="Create a playlist"
          className={`${playlistDisplayIsOpen ? "flex" : "hidden"} bg-brand-black-500 group mx-auto cursor-pointer items-center justify-between gap-1 rounded-full p-2`}
          aria-label="Create a playlist"
        >
          <AiOutlinePlus className="size-5 text-gray-400 transition-colors group-hover:text-white"></AiOutlinePlus>
        </button>
      </Tooltip>

      <div className={playlistDisplayIsOpen ? "hidden" : ""}>
        <div className="flex items-center justify-between px-1">
          <p className="font-semibold">Your Library</p>

          <div className="flex items-center gap-2">
            <Tooltip position="top" text="Create a playlist">
              <button
                title="Create a playlist"
                className="bg-brand-black-500 group flex min-w-12 cursor-pointer items-center justify-between gap-1 rounded-full px-3.5 py-2"
                aria-label="Create a playlist"
              >
                <AiOutlinePlus className="size-5 text-gray-400 transition-colors group-hover:text-white"></AiOutlinePlus>
                <span className="text-sm font-semibold">Create</span>
              </button>
            </Tooltip>

            <Tooltip position="top" text="Show more">
              <button
                title="Show more"
                className="hover:bg-brand-black-500 group flex cursor-pointer items-center justify-between gap-1 rounded-full p-2"
                aria-label="Show more"
              >
                <HiArrowRight className="size-5 text-gray-400 transition-colors group-hover:text-white"></HiArrowRight>
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {copyOfPlaylists.length !== 0 && <Pill>Playlists</Pill>}
        </div>

        <div className="relative mt-2 flex items-center justify-between">
          <div className="absolute left-0 z-10">
            <Tooltip position="topLeft" text="Search in your library">
              <button
                title="Search in your library"
                className={`${searchBoxIsOpen ? "py-1" : "hover:bg-brand-black-500 py-2"} group flex cursor-pointer items-center justify-between gap-1 rounded-full px-2`}
                aria-label="Search in your library"
                onClick={() => {
                  // Race condition 🏎️ 🏁
                  setTimeout(() => searchInputRef.current?.focus(), 300);
                  setSearchBoxIsOpen(!searchBoxIsOpen);
                }}
              >
                <GoSearch className="size-4.5 text-gray-400 transition-colors group-hover:text-white"></GoSearch>
              </button>
            </Tooltip>
          </div>

          <search
            className={`bg-brand-black-500 relative inset-0 z-0 rounded-sm py-1 transition-all duration-400 ${
              searchBoxIsOpen ? "w-fit opacity-100" : "w-0 opacity-0"
            }`}
          >
            <form role="search" className="min-h-5" onSubmit={(e) => e.preventDefault()}>
              {/* Rendering input conditionally fixes glitchy ui on open/close */}
              {searchBoxIsOpen && (
                <input
                  ref={searchInputRef}
                  onInput={(e) => handleInputChange(e.currentTarget, filterPlaylists)}
                  type="search"
                  className={`${searchBoxIsOpen ? "" : "pointer-events-none cursor-default"} max-w-48 pr-3 pl-8 text-sm text-gray-400 outline-none`}
                  placeholder="Search in your library"
                />
              )}
            </form>
          </search>

          <div className="relative">
            <button
              title="Sort playlists"
              className="group flex min-w-12 cursor-pointer items-center justify-between gap-2 rounded-full px-3.5 py-2 hover:scale-105"
              aria-label="Sort playlists"
              onClick={toggleSortMenu}
            >
              <span className="text-sm text-gray-400 transition-all group-hover:text-white">
                {selectedSortOption}
              </span>
              <TfiMenuAlt className="size-4 text-gray-400 transition-all group-hover:text-white"></TfiMenuAlt>
            </button>

            {/* Mobile settings dropdown */}
            <div
              className={`${sortMenuIsOpen ? "block" : "hidden"} bg-brand-black-500 absolute right-2 z-10 mt-2 mr-1 w-fit min-w-50 items-center justify-end gap-0 rounded-md px-1 py-3 shadow transition-all`}
            >
              <small className="px-3 text-xs text-gray-400">Sort by</small>
              <ul className="mt-2">
                {sortOptions.map((option, i) => (
                  <li className="w-full p-3 transition-colors hover:bg-gray-500/20" key={i}>
                    <button
                      className={`flex w-full items-center justify-between gap-2 text-sm wrap-normal ${option === selectedSortOption ? "text-brand-green" : "text-gray-400"}`}
                      onClick={() => {
                        setSelectedSortOption(option);
                      }}
                    >
                      <span>{option}</span>
                      {option === selectedSortOption && (
                        <IoCheckmark className="text-brand-green ml-2 size-5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              <hr className="border-brand-black-400 my-1" />

              <small className="px-3 text-xs text-gray-400">View as</small>
              <ul className="bg-brand-black-600 mt-2 grid grid-cols-4 rounded-md p-1">
                {layoutOptions.map(({ name, icon }, i) => (
                  <li
                    className={`rounded-sm px-3 py-2 transition-colors ${name === selectedLayoutOption ? "bg-brand-black-500" : ""}`}
                    key={i}
                  >
                    <button
                      aria-label={`Change playlists layout to ${name}`}
                      className={`flex w-full items-center justify-center gap-2 text-sm wrap-normal ${name === selectedLayoutOption ? "!text-white" : "text-gray-400"}`}
                      onClick={() => {
                        setSelectedLayoutOption(name);
                      }}
                    >
                      <Tooltip position="top" text={name} className="text-white">
                        {icon}
                      </Tooltip>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-1 flex-col gap-2">
        {searchQuery && !copyOfPlaylists.length && (
          <div className="flex size-full flex-col items-center justify-center gap-3 text-center">
            <p className="font-semibold">Couldn't find "{searchQuery}"</p>
            <p className="text-sm">Try searching again using a different spelling or keyword.</p>
          </div>
        )}

        <Playlists />
      </div>
    </div>
  );
};

export default PlaylistLibrary;

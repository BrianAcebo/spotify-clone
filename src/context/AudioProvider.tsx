import React, { useEffect, useState } from "react";
import data from "../data/playlists.json";
import { AudioContext } from "./AudioContext";
import type { Playlist, Track } from "../types/audio";

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  useEffect(() => {
    setPlaylists(data.playlists);
    setSelectedPlaylist(data.playlists[0]);
    setSelectedTrack(data.playlists[0].tracks[0]);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        playlists,
        selectedPlaylist,
        selectedTrack,
        setSelectedPlaylist,
        setSelectedTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

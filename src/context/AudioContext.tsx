import { createContext } from "react";
import type { Playlist, Track } from "../types/audio";

export type AudioContextType = {
  playlists: Playlist[];
  selectedPlaylist: Playlist | null;
  selectedTrack: Track | null;
  setSelectedPlaylist: (playlist: Playlist) => void;
  setSelectedTrack: (track: Track) => void;
};

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

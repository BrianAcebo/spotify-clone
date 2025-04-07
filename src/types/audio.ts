export type Playlist = (typeof import("../data/playlists.json").playlists)[0];
export type Track = Playlist["tracks"][0];

import Navbar from "./components/Navbar";
import PlaylistDisplay from "./components/PlaylistDisplay";
import PlaylistLibrary from "./components/PlaylistLibrary";
import TrackDisplay from "./components/TrackDisplay";
import { AudioProvider } from "./context/AudioProvider";
import { AudioHUDProvider } from "./context/AudioHUDProvider";
import { AudioVolumeProvider } from "./context/AudioVolumeProvider";
import Footer from "./components/Footer";
import { useState } from "react";
import HUDOverlay from "./components/audio/HUDOverlay";

const App = () => {
  // Shared state between components for opening and closing the playlist display
  // Chose this route rather than creating context and a provider because it's just a simple thing
  const [playlistDisplayIsOpen, setPlaylistDisplayIsOpen] = useState<boolean>(false);
  const togglePlaylistDisplay = (option: boolean) => {
    setPlaylistDisplayIsOpen(option);
  };

  return (
    <AudioHUDProvider>
      <AudioVolumeProvider>
        <AudioProvider>
          <div className="flex h-screen flex-col px-2">
            <Navbar />
            <main className="h-screen-visible flex flex-1 gap-2">
              <PlaylistLibrary
                playlistDisplayIsOpen={playlistDisplayIsOpen}
                togglePlaylistDisplay={togglePlaylistDisplay}
              />
              <PlaylistDisplay
                playlistDisplayIsOpen={playlistDisplayIsOpen}
                togglePlaylistDisplay={togglePlaylistDisplay}
              />
              <TrackDisplay />
            </main>
            <Footer />
          </div>
          <HUDOverlay />
        </AudioProvider>
      </AudioVolumeProvider>
    </AudioHUDProvider>
  );
};

export default App;

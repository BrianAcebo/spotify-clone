import useAudioHUD from "../../hooks/useAudioHUD";

const HUDOverlay = () => {
  // This is the text pop up when a user performs a keyboard shortcut
  // M -> "Mute"

  const { hudMessage, volumeLevel } = useAudioHUD();
  if (!hudMessage && volumeLevel === null) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center">
      {volumeLevel !== null ? (
        <div className="flex flex-col items-center gap-2 rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md">
          <div className="h-2 w-40 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-white transition-all"
              style={{ width: `${volumeLevel * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-white">{Math.round(volumeLevel * 100)}%</span>
        </div>
      ) : (
        <span className="rounded-full bg-black/80 px-4 py-2 text-sm font-medium text-white shadow-md">
          {hudMessage}
        </span>
      )}
    </div>
  );
};

export default HUDOverlay;

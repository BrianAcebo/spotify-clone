// Remove unwanted characters from a string
const unwantedCharacters = ['"', '"', "“"];
export const removeUnwantedCharacters = (s: string | undefined) => {
  if (!s) return;
  return s
    .split("")
    .filter((l: string) => !unwantedCharacters.includes(l))
    .join("");
};

// Remove all HTML tags from a string
export const encodeHTML = (s: string | undefined) => {
  if (!s) return;
  const encoded = document.createElement("div");
  encoded.innerText = s;
  return encoded.innerHTML;
};

// Remove unwanted characters and HTML tags from a string
// This function is used to clean the input string before sending it to the API
export const cleanInput = (query: string) => {
  return encodeHTML(removeUnwantedCharacters(query)) || "";
};

// Convert seconds to minutes and seconds
export const secondsToMinutesSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return { minutes, seconds: remainingSeconds };
};

// Format seconds into time -> 4:26
export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

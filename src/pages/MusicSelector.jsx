import { useState } from "react";

const MusicSelector = ({ form, setForm, objective, setError }) => {
  const [showMusicInput, setShowMusicInput] = useState(false);

  // Mock music library
  const musicLibrary = [
    { id: "music_1", name: "Trending Beat 1" },
    { id: "music_2", name: "Trending Beat 2" },
    { id: "music_3", name: "Upbeat Music" },
    { id: "music_4", name: "Chill Vibes" },
  ];

  const handleMusicSelect = (musicId) => {
    setForm({ ...form, musicId });
  };

  // Only show music selector for Conversions objective
  if (objective !== "Conversions") {
    return null;
  }

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="font-semibold mb-3">Select Music (Required for Conversions)</h3>

      <div className="grid grid-cols-2 gap-2">
        {musicLibrary.map((music) => (
          <button
            key={music.id}
            onClick={() => handleMusicSelect(music.id)}
            className={`p-2 rounded border-2 text-sm transition-colors ${
              form.musicId === music.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {music.name}
          </button>
        ))}
      </div>

      {!form.musicId && objective === "Conversions" && (
        <p className="text-red-500 text-sm mt-2">Music is required for Conversion campaigns</p>
      )}
    </div>
  );
};

export default MusicSelector;

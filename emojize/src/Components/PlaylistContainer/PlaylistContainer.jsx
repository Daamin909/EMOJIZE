import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import SongItem from "../SongItem/SongItem";

const PlaylistContainer = ({ playlist, onClose }) => {
  const [showContainer, setShowContainer] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContainer(true);
    const timer1 = setTimeout(() => setShowItems(true), 500);
    const timer2 = setTimeout(() => setShowContent(true), 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div
      className={`bg-gray-800 rounded-lg p-4 shadow-xl transition-opacity duration-500 ${
        showContainer ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Your Playlist</h2>
        <button
          className="text-gray-400 hover:text-white transition-colors duration-200"
          onClick={onClose}
          aria-label="Close playlist"
        >
          <X size={24} />
        </button>
      </div>
      <div className="space-y-2">
        {playlist.map((song) => (
          <div
            key={song.id}
            className={`transition-opacity duration-500 ${
              showItems ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`transition-opacity duration-500 ${
                showContent ? "opacity-100" : "opacity-0"
              }`}
            >
              <SongItem song={song} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistContainer;

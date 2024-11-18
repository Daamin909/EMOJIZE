import React from "react";
import { Play } from "lucide-react";

const SongItem = ({ song }) => {
  return (
    <div className="flex items-center bg-gray-700 rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-gray-600 hover:scale-[1.02] hover:shadow-md">
      <div className="flex items-center flex-1">
        <img
          src={song.albumArt}
          alt={`${song.album} cover`}
          className="w-10 h-10 rounded-full mr-4"
        />
        <button
          className="w-8 h-8 flex items-center justify-center bg-cyan-500 rounded-full mr-4 hover:bg-cyan-400 transition-colors duration-200"
          aria-label={`Play ${song.title}`}
        >
          <Play size={16} className="text-white" />
        </button>
        <div>
          <h3 className="font-semibold text-white">{song.title}</h3>
          <p className="text-sm text-gray-400">{song.artist}</p>
        </div>
      </div>
      <span className="text-sm text-gray-400">{song.duration}</span>
    </div>
  );
};

export default SongItem;

import React from "react";
import { Play } from "lucide-react";
import "./SongItem.css";

const SongItem = ({ song }) => {
  return (
    <div className="song-item">
      <div className="song-info">
        <img
          src={song.albumArt}
          alt={`${song.album} cover`}
          className="album-art"
        />
        <button className="play-button" aria-label={`Play ${song.title}`}>
          <Play size={16} className="play-icon" />
        </button>
        <div className="song-details">
          <h3 className="song-title">{song.title}</h3>
          <p className="song-artist">{song.artist}</p>
        </div>
      </div>
      <span className="song-duration">{song.duration}</span>
    </div>
  );
};

export default SongItem;

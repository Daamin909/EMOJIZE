import React from "react";
import { Play } from "lucide-react";
import "./SongItem.css";

const SongItem = ({ song }) => {
  return (
    <div className="song-item">
      <div className="song-info">
        <img src={song.image_url} alt={`song cover`} className="album-art" />
        <a
          href={`https://open.spotify.com/track/${song.song_id}`}
          target="_blank"
          className="play-button"
          aria-label={`Play ${song.name}`}
        >
          <Play size={16} className="play-icon" />
        </a>
        <div className="song-details">
          <h3 className="song-title">{song.name}</h3>
          <p className="song-artist">{song.artists}</p>
        </div>
      </div>
      <span className="song-duration">{song.duration}</span>
    </div>
  );
};

export default SongItem;

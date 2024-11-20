import React, { useState, useEffect } from "react";
import { X, Play } from "lucide-react";
import SongItem from "../SongItem/SongItem";
import "./PlaylistContainer.css";

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
    <div className={`playlist-container ${showContainer ? "show" : ""}`}>
      <div className="playlist-header">
        <a
          href={`${playlist.playlist_url}`}
          target="_blank"
          className="playlist-title"
        >
          <button className="play-button" id="main-play">
            <Play size={16} className="play-icon" />
          </button>
          {playlist.playlist_name}
        </a>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close playlist"
        >
          <X size={24} />
        </button>
      </div>
      <div className="song-list">
        {playlist.songs.map((song) => (
          <div
            key={song.song_id}
            className={`song-item-wrapper ${showItems ? "show" : ""}`}
          >
            <div className={`song-item-content ${showContent ? "show" : ""}`}>
              <SongItem song={song} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistContainer;

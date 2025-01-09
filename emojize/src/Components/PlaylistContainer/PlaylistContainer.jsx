import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "./PlaylistContainer.css";
import "../SongItem/SongItem.css";

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
          href={`https://open.spotify.com/playlist/${playlist.playlist_id}`}
          target="_blank"
          className="playlist-title"
        >
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
      <iframe
        src={`https://open.spotify.com/embed/playlist/${playlist.playlist_id}`}
        width="720"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default PlaylistContainer;

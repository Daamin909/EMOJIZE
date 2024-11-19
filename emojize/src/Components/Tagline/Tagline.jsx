import React from "react";
import "./Tagline.css";

const Tagline = () => {
  return (
    <div className="desc-container">
      <p className="desc">
        Transform your mood into melodies, using emojis! Pick some emojis, and
        let the magic of music begin
        <span className="music-note">🎵</span>
        <span className="glow">✨</span>
      </p>
    </div>
  );
};

export default Tagline;

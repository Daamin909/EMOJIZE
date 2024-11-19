"use client";

import React, { useState, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import InputBar from "../InputBar/InputBar";
import PlaylistContainer from "../PlaylistContainer/PlaylistContainer";
import "./Emojize.css";
import { Info, Mail } from "lucide-react";
import Tagline from "../Tagline/Tagline";
import ErrorMessage from "./../ErrorMessage/ErrorMessage";

const Emojize = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const playlistRef = useRef(null);
  const inputRef = useRef(null);
  const areEmojis = (text) => {
    const emojiPattern = /^[\p{Emoji}\p{Extended_Pictographic}]+$/u;
    return emojiPattern.test(text);
  };
  const handleSendClick = (input) => {
    if (!areEmojis(input)) {
      displayError("Enter Emojis only! and try again.");
      return;
    }
    setIsGenerating(true);
    setPlaylist([]);
  };
  const handleEmojiSelect = (emoji) => {
    inputRef.current.value = inputRef.current.value + emoji;
  };

  const displayError = (text) => {
    setErrorMessage(text);
  };

  return (
    <div className="emoji-playlist-generator">
      <Navbar />

      <main className="main-content">
        <Tagline />
        <InputBar
          inputRef={inputRef}
          onSendClick={handleSendClick}
          onEmojiSelect={handleEmojiSelect}
        />

        <div ref={playlistRef} className="playlist-wrapper">
          {isGenerating ? (
            <div className="loading-container">
              <div className="loading-animation">
                <div className="music-note">♪</div>
                <div className="music-note">♫</div>
                <div className="music-note">♬</div>
              </div>
              <p className="loading-text">Creating your playlist...</p>
            </div>
          ) : (
            showPlaylist && (
              <PlaylistContainer
                playlist={playlist}
                onClose={() => setShowPlaylist(false)}
              />
            )
          )}
        </div>
      </main>

      <footer className="footer">
        <a href="#" id="dummy" className="footer-link">
          <Mail size={18} />
        </a>
        <p className="footer-text">Made with ❤️ for Hack Club</p>
        <a href="#" className="footer-link">
          <Info size={18} />
        </a>
      </footer>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          duration={2000}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </div>
  );
};

export default Emojize;

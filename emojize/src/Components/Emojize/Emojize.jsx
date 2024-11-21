"use client";

import React, { useState, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import InputBar from "../InputBar/InputBar";
import PlaylistContainer from "../PlaylistContainer/PlaylistContainer";
import "./Emojize.css";
import { Info, Mail } from "lucide-react";
import Tagline from "../Tagline/Tagline";
import ErrorMessage from "./../ErrorMessage/ErrorMessage";
import make_playlist from "../../scripts";

const Emojize = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const playlistRef = useRef(null);
  const inputRef = useRef(null);
  const [showEmojiGrid, setShowEmojiGrid] = useState(false);

  const areEmojis = (text) => {
    const emojiPattern =
      /^[😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😜🤪😝🤑🤗🤭🤫🤔🤐🤨😐😑😶😏😒🙄😬🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧🥵🥶🥴😵🤯🤠🥳😎🤓🧐😕😟🙁☹️😮😯😲😳🥺😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱😤😡😠🤬😈👿💀☠️💩🤡👹👺👻👽👾🤖💋💌💘💝💖💗💓💞💕💟❣️💔❤️🧡💛💚💙💜🤎🖤🤍💯💢💥💫👁️‍🗨️🗨️🗯️💭💤👋🤚🖐️✋🖖👌🤏✌️🤞🤟🤘🤙👈👉👆👇🖕☝️👍👎✊👊🤛🤜👏🙌👐🤲🤝🙏✍️💅🤳💪🦾🦵🦿🦶👣👀👁️🧠🦷🦴]+$/;
    return emojiPattern.test(text);
  };
  const handleSendClick = (input) => {
    setShowEmojiGrid(false);
    if (input.length === 0) {
      displayError("Enter an emoji!");
      return;
    } else if (!areEmojis(input)) {
      displayError("Enter emojis from the dropdown only!");
      return;
    } else if (input.length > 50) {
      displayError("Enter upto 50 emojis only!");
      return;
    }

    setIsGenerating(true);
    setPlaylist([]);
    make_playlist(input, setIsGenerating, setPlaylist, setShowPlaylist);
  };
  const handleEmojiSelect = (emoji, setInputValue) => {
    setInputValue(inputRef.current.value + emoji);
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
          showEmojiGrid={showEmojiGrid}
          setShowEmojiGrid={setShowEmojiGrid}
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
        <a
          href="https://github.com/daamin909/EMOJIZE"
          target="_blank"
          className="footer-link"
        >
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

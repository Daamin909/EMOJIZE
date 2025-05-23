import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import "./InputBar.css";
import emojis from "./../../scripts/emoji";

const InputBar = ({
  onSendClick,
  onEmojiSelect,
  inputRef,
  setShowEmojiGrid,
  showEmojiGrid,
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSendClick(inputValue, setInputValue);
    }
  };

  return (
    <div className="input-bar-container">
      <div className="input-bar">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          ref={inputRef}
          placeholder="Enter your emojis..."
          className="input-field"
        />
        <button
          onClick={() => onSendClick(inputValue, setInputValue)}
          className="send-button"
          aria-label="Send"
        >
          <ArrowRight size={24} />
        </button>
        <div className="dropdown-container">
          <button
            className="dropdown-toggle"
            onClick={() => setShowEmojiGrid(!showEmojiGrid)}
            aria-label="Emoji dropdown"
          >
            <ChevronDown size={24} />
          </button>
          {showEmojiGrid && (
            <div className="emoji-grid">
              <div className="grid-content">
                {emojis
                  .slice()
                  .reverse()
                  .map((emoji, index) => (
                    <button
                      key={index}
                      className="grid-emoji-button"
                      onClick={() => {
                        onEmojiSelect(emoji, setInputValue);
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputBar;

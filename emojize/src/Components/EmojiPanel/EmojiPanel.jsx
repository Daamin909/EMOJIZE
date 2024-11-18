import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const initialEmojis = [
  "😊",
  "😢",
  "😡",
  "😴",
  "🎉",
  "🌈",
  "🚀",
  "🍕",
  "🎸",
  "🌙",
];
const initialAllEmojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🤩",
  "🥳",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "😖",
  "😫",
  "😩",
  "🥺",
  "😢",
  "😭",
  "😤",
  "😠",
  "😡",
  "🤬",
  "🤯",
  "😳",
  "🥵",
  "🥶",
  "😱",
  "😨",
  "😰",
  "😥",
  "😓",
  "🤗",
];

const EmojiPanel = ({ onEmojiSelect }) => {
  const [showEmojiGrid, setShowEmojiGrid] = useState(false);
  const [allEmojis, setAllEmojis] = useState(initialAllEmojis);

  const addEmoji = (emoji) => {
    if (!allEmojis.includes(emoji)) {
      setAllEmojis([...allEmojis, emoji]);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-6 mb-12">
      <div className="flex space-x-4">
        {initialEmojis.map((emoji, index) => (
          <button
            key={index}
            className="text-4xl transition-transform duration-200 hover:scale-150 focus:outline-none"
            onClick={() => onEmojiSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
      <div className="relative">
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold p-2 rounded inline-flex items-center justify-center"
          onClick={() => setShowEmojiGrid(!showEmojiGrid)}
          aria-label="More Emojis"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
        {showEmojiGrid && (
          <div className="absolute right-0 mt-2 w-96 bg-gray-800 rounded-lg shadow-xl z-10 p-4">
            <div
              className="grid grid-cols-8 gap-4 max-h-96 overflow-y-auto pr-2"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#000000 #1F2937",
              }}
            >
              {allEmojis.map((emoji, index) => (
                <button
                  key={index}
                  className="text-3xl hover:bg-gray-700 p-3 rounded transition-all duration-300 hover:rotate-[360deg] hover:scale-110"
                  onClick={() => {
                    onEmojiSelect(emoji);
                    setShowEmojiGrid(false);
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Add emoji"
                className="bg-gray-700 text-white p-2 rounded-l-md focus:outline-none"
                maxLength="2"
                onChange={(e) => {
                  if (e.target.value.length === 2) {
                    addEmoji(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <button
                className="bg-cyan-500 text-white p-2 rounded-r-md hover:bg-cyan-600 transition-colors"
                onClick={() => setAllEmojis([...allEmojis])}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiPanel;

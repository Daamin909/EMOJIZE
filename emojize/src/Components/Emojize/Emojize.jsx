"use client";

import React, { useState, useEffect, useRef } from "react";
import { Info, MessageSquare, Mail } from "lucide-react";

import Navbar from "./../Navbar/Navbar";
import EmojiPanel from "./../EmojiPanel/EmojiPanel";
import PlaylistContainer from "./../PlaylistContainer/PlaylistContainer";

const Emojize = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const playlistRef = useRef(null);

  useEffect(() => {
    if (selectedEmoji) {
      setIsGenerating(true);
      setPlaylist([]);
      setTimeout(() => {
        const newPlaylist = [
          {
            id: 1,
            title: "Happy",
            artist: "Pharrell Williams",
            album: "G I R L",
            duration: "3:53",
            albumArt: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 2,
            title: "Don't Stop Me Now",
            artist: "Queen",
            album: "Jazz",
            duration: "3:29",
            albumArt: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 3,
            title: "Walking on Sunshine",
            artist: "Katrina and The Waves",
            album: "Walking on Sunshine",
            duration: "3:58",
            albumArt: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 4,
            title: "I Wanna Dance with Somebody",
            artist: "Whitney Houston",
            album: "Whitney",
            duration: "4:52",
            albumArt: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 5,
            title: "Can't Stop the Feeling!",
            artist: "Justin Timberlake",
            album: "Trolls",
            duration: "3:56",
            albumArt: "/placeholder.svg?height=40&width=40",
          },
        ];
        setPlaylist(newPlaylist);
        setIsGenerating(false);
        setShowPlaylist(true);
        playlistRef.current.scrollIntoView({ behavior: "smooth" });
      }, 2000);
    }
  }, [selectedEmoji]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <EmojiPanel onEmojiSelect={setSelectedEmoji} />

        <div ref={playlistRef} className="max-w-3xl mx-auto">
          {isGenerating ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
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

      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-80 p-4 text-center">
        <div className="flex justify-center space-x-6 mb-2">
          <a
            href="#"
            className="text-gray-400 hover:text-cyan-500 transition-colors duration-200"
          >
            <Info size={18} />
            <span className="sr-only">About</span>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-cyan-500 transition-colors duration-200"
          >
            <MessageSquare size={18} />
            <span className="sr-only">Feedback</span>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-cyan-500 transition-colors duration-200"
          >
            <Mail size={18} />
            <span className="sr-only">Contact</span>
          </a>
        </div>
        <p className="text-sm text-gray-400">Made with ❤️ for Hack Club</p>
      </footer>
    </div>
  );
};

export default Emojize;

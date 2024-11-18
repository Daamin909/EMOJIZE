import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 p-4 z-10 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-wider font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          E M O J I Z E
        </h1>
      </div>
      <div className="flex items-center">
        <p className="text-sm font-light text-gray-400 mr-4">
          Your vibe, your music!
        </p>
        <div className="flex space-x-2">
          <div className="w-2 h-8 bg-cyan-500 animate-pulse"></div>
          <div
            className="w-2 h-8 bg-blue-500 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-8 bg-purple-500 animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

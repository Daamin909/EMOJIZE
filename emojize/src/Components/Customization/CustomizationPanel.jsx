import React, { useState } from "react";
import "./CustomizationPanel.css";

const CustomizationPanel = ({ onCustomizationChange }) => {
  const [numberOfSongs, setNumberOfSongs] = useState(20);
  const [moreGenre, setMoreGenre] = useState("");
  const [lessGenre, setLessGenre] = useState("");
  const [includeExplicit, setIncludeExplicit] = useState(true);

  const handleChange = (key, value) => {
    onCustomizationChange({ [key]: value });
  };

  return (
    <div className="customization-panel">
      <h3>🎶 Customise Your Playlist 🎶</h3>

      <div className="option-group">
        <div className="number-display">Number of songs: {numberOfSongs}</div>
        <input
          type="range"
          min="5"
          max="40"
          value={numberOfSongs}
          onChange={(e) => {
            setNumberOfSongs(Number(e.target.value));
            handleChange("numberOfSongs", Number(e.target.value));
          }}
          className="range-slider"
          style={{ "--value-percent": `${((numberOfSongs - 5) / 35) * 100}%` }}
        />

        <div className="genre-inputs">
          <div className="input-group">
            <label>More of:</label>
            <input
              type="text"
              value={moreGenre}
              onChange={(e) => {
                setMoreGenre(e.target.value);
                handleChange("moreGenre", e.target.value);
              }}
              placeholder="e.g., Pop"
            />
          </div>

          <div className="input-group">
            <label>Less of:</label>
            <input
              type="text"
              value={lessGenre}
              onChange={(e) => {
                setLessGenre(e.target.value);
                handleChange("lessGenre", e.target.value);
              }}
              placeholder="e.g., Rock"
            />
          </div>
        </div>

        <div className="toggle-container">
          <label className="toggle">
            <input
              type="checkbox"
              checked={includeExplicit}
              onChange={(e) => {
                setIncludeExplicit(e.target.checked);
                handleChange("includeExplicit", e.target.checked);
              }}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label">Explicit Content</span>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;

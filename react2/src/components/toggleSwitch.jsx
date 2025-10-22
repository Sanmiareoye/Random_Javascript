import { useState } from "react";

export default function ToggleSwitch({ defaultMode = 2, onChange }) {
  const [mode, setMode] = useState(defaultMode);

  const toggleMode = () => {
    const newMode = mode === 1 ? 2 : 1;
    setMode(newMode);
    if (onChange) onChange(newMode);
  };

  const switchStyle = {
    position: "relative",
    width: "12rem",
    height: "4rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    backgroundColor: mode === 2 ? "#a855f7" : "#3b82f6",
    transition: "background-color 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
  };

  const sliderStyle = {
    position: "absolute",
    top: "0.25rem",
    left: mode === 2 ? "calc(100% - 6rem - 0.25rem)" : "0.25rem",
    width: "6rem",
    height: "3.5rem",
    backgroundColor: "gray",
    borderRadius: "0.375rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    transition: "left 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: mode === 2 ? "#a855f7" : "#3b82f6",
    fontWeight: "bold",
    fontSize: "1rem",
  };

  const textStyle = (isActive) => ({
    zIndex: 1,
    opacity: isActive ? 0.5 : 1,
    transition: "opacity 0.3s",
    fontSize: isActive ? "0.875rem" : "1rem",
    width: "6rem",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <div onClick={toggleMode} style={switchStyle}>
      <span style={textStyle(mode === 1)}>{mode === 1 ? "M1" : "Mode 1"}</span>
      <span style={textStyle(mode === 2)}>{mode === 2 ? "M2" : "Mode 2"}</span>

      <div style={sliderStyle}>{mode === 1 ? "M1" : "M2"}</div>
    </div>
  );
}

export function ModeToggle({ defaultMode = 1, onChange }) {
  const [mode, setMode] = useState(defaultMode);

  const toggleMode = () => {
    const newMode = mode === 1 ? 2 : 1;
    setMode(newMode);
    if (onChange) onChange(newMode);
  };

  const switchStyle = {
    position: "relative",
    width: "12rem",
    height: "4rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    backgroundColor: mode === 2 ? "#a855f7" : "#3b82f6",
    transition: "background-color 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
  };

  const dividerStyle = {
    position: "absolute",
    left: "50%",
    top: "10%",
    bottom: "10%",
    width: "2px",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    transform: "translateX(-50%)",
  };

  const textStyle = (isActive) => ({
    flex: 1,
    textAlign: "center",
    opacity: isActive ? 1 : 0.5,
    transition: "opacity 0.3s",
    fontSize: "1rem",
    fontWeight: isActive ? "bold" : "600",
  });

  return (
    <div onClick={toggleMode} style={switchStyle}>
      <span style={textStyle(mode === 1)}>{mode === 1 ? "Mode 1" : "M1"}</span>

      <div style={dividerStyle} />

      <span style={textStyle(mode === 2)}>{mode === 2 ? "Mode 2" : "M2"}</span>
    </div>
  );
}

// Compact Version (named export)
export function ModeToggleCompact({ defaultMode = 1, onChange }) {
  const [mode, setMode] = useState(defaultMode);

  const toggleMode = () => {
    const newMode = mode === 1 ? 2 : 1;
    setMode(newMode);
    if (onChange) onChange(newMode);
  };

  return (
    <div
      onClick={toggleMode}
      className={`relative w-24 h-12 rounded-full cursor-pointer transition-colors duration-300 ${
        mode === 2 ? "bg-purple-500" : "bg-blue-500"
      } flex items-center justify-between px-2 text-white font-semibold`}
    >
      <span
        className={`z-10 transition-opacity ${
          mode === 1 ? "opacity-100" : "opacity-50"
        }`}
      >
        M1
      </span>
      <span
        className={`z-10 transition-opacity ${
          mode === 2 ? "opacity-100" : "opacity-50"
        }`}
      >
        M2
      </span>

      <div
        className={`absolute top-1 w-10 h-10 bg-white rounded-full shadow-lg transition-transform duration-300 ${
          mode === 2 ? "translate-x-12 left-1" : "left-1"
        }`}
      />
    </div>
  );
}

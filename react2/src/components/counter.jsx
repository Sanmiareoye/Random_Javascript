import { useContext, useEffect, useState } from "react";
import "../index.css";
import { ThemeContext } from "../context/themeContext";

function Counter() {
  const [counter, setCounter] = useState({ hour: 0, minute: 0, second: 0 });
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  useEffect(() => {
    if (!running) {
      return;
    }
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev.second === 59) {
          const newMinute = prev.minute + 1;

          if (newMinute === 60) {
            setTime(true);
            setRunning(false);
            return { hour: prev.hour + 1, minute: 0, second: 0 };
          }
          return { hour: prev.hour, minute: newMinute, second: 0 };
        } else {
          return {
            hour: prev.hour,
            minute: prev.minute,
            second: prev.second + 1,
          };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const handleReset = () => {
    setCounter({ hour: 0, minute: 0, second: 0 });
    setRunning(false);
    setTime(false);
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleStart = () => {
    setRunning(true);
  };

  const displayCounter = () => {
    const hr = counter.hour < 10 ? `0${counter.hour}` : counter.hour;
    const m = counter.minute < 10 ? `0${counter.minute}` : counter.minute;
    const s = counter.second < 10 ? `0${counter.second}` : counter.second;

    return `${hr}:${m}:${s}`;
  };

  return (
    <div>
      <button
        onClick={() =>
          setTheme(theme === "white" ? "rgb(69, 184, 177)" : "white")
        }
      >
        {theme}
      </button>
      <h1>
        {time ? (
          <div>
            <p>
              Time's up! <span className="vibrate">⏰</span>
            </p>
          </div>
        ) : (
          displayCounter()
        )}
      </h1>
      <button style={{ backgroundColor: "lightgray" }} onClick={handleReset}>
        Reset
      </button>
      <button style={{ backgroundColor: "lightgray" }} onClick={handleStart}>
        Start
      </button>
      <button style={{ backgroundColor: "lightgray" }} onClick={handleStop}>
        Stop
      </button>
    </div>
  );
}

export default Counter;

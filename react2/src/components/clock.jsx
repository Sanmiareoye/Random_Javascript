import { useEffect, useState } from "react";
import "../index.css";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext.jsx";

function Clock() {
  const [time, setTime] = useState(new Date());
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () =>
      clearInterval(() => {
        setTime(new Date());
      }, 1000);
  }, []);

  return (
    <div>
      <button
        onClick={() =>
          setTheme(theme === "white" ? "rgb(69, 184, 177)" : "white")
        }
      >
        Current: {theme}
      </button>
      <h1 className="shake" style={{ fontSize: 100 }}>
        ⏰
      </h1>
      <h1>{time.toLocaleTimeString()}</h1>
    </div>
  );
}

export default Clock;

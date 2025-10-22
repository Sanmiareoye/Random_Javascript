import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "white";
  });
  const text = theme === "white" ? "black" : "white";

  useEffect(() => {
    document.body.style.backgroundColor = theme;
    document.body.style.color = text;
    localStorage.setItem("theme", theme);
  }, [theme, text]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

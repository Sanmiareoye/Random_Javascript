import { useState, useEffect } from "react";

function ColorChanger() {
  const [color, setColor] = useState(localStorage.getItem("color") || "grey");

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  const handleColor = () => {
    const r = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const newcolor = `rgb(${r}, ${b}, ${g})`;
    setColor(newcolor);
    localStorage.setItem("color", newcolor);
  };

  return <button onClick={handleColor}>Change Color</button>;
}

export default ColorChanger;

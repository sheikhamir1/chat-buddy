import React, { useState, useEffect } from "react";

export function HoverThemeUtil() {
  const [currentTheme, setCurrentTheme] = useState(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setCurrentTheme(theme); // Set the theme to state
  }, []);

  const lightThemeArray = [
    "light",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "valentine",
    "garden",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "cmyk",
    "autumn",
    "acid",
    "lemonade",
    "winter",
  ];

  const hoverClass = lightThemeArray.includes(currentTheme)
    ? "hover:bg-gray-200"
    : "hover:bg-gray-800";

  return hoverClass;
}

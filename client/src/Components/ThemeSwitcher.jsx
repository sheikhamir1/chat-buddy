import { useState } from "react";
import { ButtonUtil } from "./ButtonUtil";
import { toast } from "react-toastify";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export function AllThemes() {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "dark"
  ); // saved theme

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName); // Update the current theme
    document.body.setAttribute("data-theme", themeName); // Apply the theme globally
  };

  const saveTheme = () => {
    localStorage.setItem("theme", currentTheme);
    toast.success("Theme saved successfully!");
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {themes.map((themeName) => (
          <div
            key={themeName}
            className="border-b p-4 flex items-center justify-center"
          >
            <button
              data-theme={themeName}
              className={`theme ${
                themeName === currentTheme ? "active" : ""
              }w-full p-6 btn btn-soft`}
              onClick={() => handleThemeChange(themeName)} // Apply theme on click
            >
              {themeName}
            </button>
          </div>
        ))}
      </div>
      <div className="px-6 py-4  flex justify-end space-x-3">
        {/* <ButtonUtil buttonName={"Cancel"} /> */}
        <ButtonUtil buttonName={"Save Changes"} onClick={saveTheme} />
      </div>
    </>
  );
}

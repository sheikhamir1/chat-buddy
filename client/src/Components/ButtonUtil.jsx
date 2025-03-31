import React from "react";

export function ButtonUtil({ buttonName, onClick, style }) {
  return (
    <button
      className={`${
        style || ""
      }p-2 font-medium btn-outline cursor-pointer hover:border-b-blue-700 border-2 hover:transition duration-300 ease-in-out btn`}
      onClick={onClick}
    >
      {buttonName || "Button"}
    </button>
  );
}

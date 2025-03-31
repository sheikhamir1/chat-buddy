import React from "react";

export function Logo({ style }) {
  return (
    <img
      className={`h-15 w-15 text-blue-500 ${style || ""}`}
      src="https://img.icons8.com/arcade/64/chat.png"
      alt="chat"
    />
  );
}

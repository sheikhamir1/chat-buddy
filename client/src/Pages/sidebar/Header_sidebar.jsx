import React from "react";
import { Logo } from "../../Svg/Logo";

export function Header_sidebar() {
  return (
    <div className="px-4 py-2 border-b ">
      <div className="flex items-center">
        <Logo />
        <span className="ml-2 text-2xl font-semibold  ">Chat Buddy</span>
      </div>
    </div>
  );
}

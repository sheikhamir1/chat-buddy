import React from "react";
import SearchSvg from "../../Svg/SearchSvg";

export function SearchBar_sidebar() {
  return (
    <div className="p-4  ">
      <div className="relative">
        <input
          type="text"
          placeholder="Search conversations"
          className="w-full py-2 pl-10 pr-4 text-sm input"
        />

        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchSvg />
        </div>
      </div>
    </div>
  );
}

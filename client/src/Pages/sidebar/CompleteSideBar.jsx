import React from "react";
import { Header_sidebar } from "./Header_sidebar";
import { SearchBar_sidebar } from "./SearchBar_sidebar";
import { SideBar } from "./SideBar";
import { SideBarSetting } from "./SideBarSetting";

export function CompleteSideBar() {
  return (
    <>
      <nav className="flex-col w-2xl  h-full border-r  max-h-screen">
        <Header_sidebar />
        <SearchBar_sidebar />
        <SideBar />
        <SideBarSetting />
      </nav>
    </>
  );
}

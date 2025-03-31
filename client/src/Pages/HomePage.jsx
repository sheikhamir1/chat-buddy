import React from "react";
import { ShowChat } from "../Pages/chats/ShowChat";
import { useStore } from "../Store";
import { CompleteSideBar } from "./sidebar/CompleteSideBar";
import { CompleteChats } from "./chats/CompleteChats";

export function HomePage() {
  const { selectedUser } = useStore((state) => state);

  return (
    <>
      <div className="MainPage h-screen flex">
        <CompleteSideBar />
        {!selectedUser ? <ShowChat /> : <CompleteChats />}
      </div>
    </>
  );
}

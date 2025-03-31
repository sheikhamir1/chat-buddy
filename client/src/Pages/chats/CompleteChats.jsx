import React from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { SendChat } from "./SendChat";

export function CompleteChats() {
  return (
    <>
      <div id="chatInterface" className="flex flex-col h-screen  w-screen">
        <ChatHeader />
        <ChatMessages />
        <SendChat />
      </div>
    </>
  );
}

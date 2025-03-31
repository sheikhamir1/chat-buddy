import React, { useEffect, useRef } from "react";
import { useStore } from "../../Store";
import { FormatMessageTime } from "../../utils/FormatMessageTime";

export function ChatMessages() {
  const {
    selectedUser,
    authUser,
    chatMessage,
    getChatMessages,
    subscribeToMessage,
    unsubscribeToMessage,
  } = useStore((state) => state);

  useEffect(() => {
    // console.log("authUser should be render once on component mount", authUser);
  }, []);
  const messageEndRef = useRef(null);

  // messageEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    getChatMessages(selectedUser._id);
    subscribeToMessage();

    return () => unsubscribeToMessage();
  }, [selectedUser._id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessage, selectedUser, subscribeToMessage, unsubscribeToMessage]);

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4">
        {chatMessage
          ?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Ensure correct order
          ?.map((msg) => {
            const isSender = msg.senderID === authUser._id;

            return (
              <div
                key={msg._id}
                className={`chat ${isSender ? "chat-end" : "chat-start"}`}
                ref={messageEndRef}
              >
                <div className="flex items-end space-x-2">
                  {!isSender && (
                    <img
                      src={
                        selectedUser?.profilePic ||
                        "https://avatar.iran.liara.run/public/boy?username=alex"
                      }
                      alt="Profile Picture"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}

                  <div className="flex flex-col">
                    <div
                      className={`chat-bubble ${
                        isSender
                          ? "chat-bubble-primary"
                          : "chat-bubble-secondary"
                      }`}
                    >
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Sent Image"
                          className="w-48 h-48 object-cover p-1 rounded-lg"
                        />
                      )}
                      <div className="py-2">
                        {msg.message && <span>{msg.message}</span>}
                      </div>
                      <span className="text-xs ">
                        {FormatMessageTime(msg.createdAt)}
                      </span>
                    </div>
                  </div>

                  {isSender && (
                    <img
                      src={
                        authUser.profilePic ||
                        "https://avatar.iran.liara.run/public/boy?username=alex"
                      }
                      alt="Profile Picture"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

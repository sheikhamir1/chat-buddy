import React from "react";
import { useStore } from "../../Store";

export function ChatHeader() {
  const { selectedUser, onlineUsers } = useStore((state) => state);

  return (
    <>
      <div className=" border-b  p-[14px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer">
            <img
              src={
                selectedUser?.profilePic ||
                "https://avatar.iran.liara.run/public/boy?username=alex"
              }
              alt="Alex Johnson"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <h2 className="text-lg font-semibold ">
                {selectedUser?.fullName}
              </h2>
              <p className="text-xs ">
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

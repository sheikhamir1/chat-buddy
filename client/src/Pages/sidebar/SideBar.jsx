import React, { useEffect } from "react";
import { useStore } from "../../Store.jsx";
import { SkeletonSidebar } from "../../Components/SkeletonSidebar.jsx";
import { themesArray } from "../../utils/AllThemeArray.js";
import { HoverThemeUtil } from "../../utils/HoverThemeUtil.jsx";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
const url =
  process.env.VITE_NODE_ENV === "development"
    ? `http://localhost:3000/api/v1/`
    : "/api/v1/";

export function SideBar() {
  // from store
  const { setSelectedUser, selectedUser, onlineUsers } = useStore(
    (state) => state
  );

  // theme setup
  const hoverClass = HoverThemeUtil();

  // get all users data
  const getAllUsers = async () => {
    try {
      // Make the GET request to fetch data
      const response = await fetch(`${url}message`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response was successful
      if (!response.ok) {
        const data = await response.json();
        throw new Error(`status: ${response.status}, Error: ${data.message}`);
      }

      // Parse the JSON data
      const data = await response.json();
      return data.fliterCurrentUser; // Ensure that the server response includes this field
    } catch (error) {
      console.error(error);
      throw new Error(error.message); // You can handle the error here
    }
  };

  const { data, error, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  // console.log("online users:", onlineUsers);
  useEffect(() => {
    // console.log("online users:", onlineUsers);
    if (error) {
      toast(error?.message, { type: "error" });
    }
  }, [onlineUsers, error]);

  if (isPending) return <SkeletonSidebar />;

  return (
    <div className="flex-1 h-[390px] overflow-y-auto">
      {data.map((user) => {
        return (
          <div
            key={user._id}
            className="p-3 relative border-l-4 border-blue-500 "
          >
            <div
              className={`flex items-center cursor-pointer py-2 ${
                hoverClass || ""
              } `}
              onClick={() => setSelectedUser(user)}
              // onClick={handleChat(user)}
            >
              <img
                src={`${
                  user.profilePic ||
                  "https://avatar.iran.liara.run/public/boy?username=alex"
                } `}
                alt={user.fullName}
                className={`w-12 h-12 rounded-full object-cover ${
                  selectedUser?._id === user?._id ? "border-2 " : ""
                } `}
                width="40"
                height="40"
              />
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium ">{user.fullName}</p>
                  <p className="text-xs ">12:30 PM</p>
                </div>
                {onlineUsers.includes(user._id) && (
                  <div>
                    <span className="absolute top-5 left-11 w-3 h-3 bg-green-300 rounded-full" />
                    <p className="text-xs  truncate">online</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

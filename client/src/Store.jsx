import { toast } from "react-toastify";
import { create } from "zustand";
import { io } from "socket.io-client";

const baseUrl =
  process.env.VITE_NODE_ENV === "development"
    ? `http://localhost:3000/api/v1/`
    : "/api/v1/";

console.log("baseUrl is store:", baseUrl);

export const useStore = create((set, get) => ({
  // auth
  authUser: null,
  isUserLogin: false,

  setAuthUser: (data) => set({ authUser: data }),
  setIsUserLogin: (data) => set({ isUserLogin: data }),

  // check if user is logged in
  onRefresh: async () => {
    localStorage.getItem("theme") &&
      document.body.setAttribute("data-theme", localStorage.getItem("theme"));
    try {
      const res = await fetch(`${baseUrl + "auth"}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const user = data.findUser;
      // console.log("user:", user);

      if (!res.ok) {
        toast(data.message, { type: "error" });
        throw new Error(data.message);
      }
      if (res.ok) {
        set({ isUserLogin: true });
        console.log("data:", user);
        set({ authUser: user });

        get().connectSocket();
      }
    } catch (error) {
      console.log(error);
      toast(error.message, { type: "error" });
    }
  },

  // message
  selectedUser: null,
  onlineUsers: [],
  socket: null,
  chatMessage: [],

  setSelectedUser: (data) => set({ selectedUser: data }),
  setOnlineUsers: (data) => set({ onlineUsers: data }),
  setchatMessage: (data) => set({ chatMessage: data }),

  subscribeToMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = get().socket;

    socket.on("message", (data) => {
      set({ chatMessage: [...get().chatMessage, data] });
    });
  },

  unsubscribeToMessage: () => {
    const socket = get().socket;
    socket.off("message");
  },

  getChatMessages: async () => {
    set({ isPendingOn: true });
    try {
      const res = await fetch(
        `${baseUrl + "message/" + get().selectedUser._id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      // console.log("chat data:", data);

      if (!res.ok) {
        toast(data.message, { type: "error" });
        // throw new Error(data.message);
      }
      if (res.ok) {
        const allMsgs = data.userMessages;
        // console.log("chat messages in store:", data);

        set({ isPendingOn: false });
        set({ chatMessage: allMsgs });
      }
    } catch (error) {
      set({ isPendingOn: false });
      console.log(error);
      toast(error.message, { type: "error" });
    }
  },

  // online users

  connectSocket: () => {
    const socket = io(
      process.env.VITE_NODE_ENV === "development"
        ? "http://localhost:3000"
        : "/",
      {
        query: {
          userID: get().authUser?._id,
        },
      }
    );

    socket.connect();
    set({ socket: socket });

    socket.on("onlineUsers", (userIds) => {
      // console.log("userIds:", userIds);
      set({ onlineUsers: userIds });
    });
    console.log("Connected to the server");
  },

  disconnectSocket: () => {
    if (get().socket) {
      get().socket.disconnect();
      console.log("Disconnected from the server");
    }
  },
}));

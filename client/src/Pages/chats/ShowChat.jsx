import React from "react";
import { Logo } from "../../Svg/Logo";

export function ShowChat() {
  return (
    <div className="hero  min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <Logo style={"w-20 h-20"} />
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Chat Buddy makes staying connected easy with real-time messaging,
            file sharing, and a simple, user-friendly interface. Whether with
            friends or teammates, your next great conversation is just a click
            away!
          </p>
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>
  );
}

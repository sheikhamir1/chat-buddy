import React from "react";
import { Logo } from "../../Svg/Logo";

export function ShowLoginSignUp() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex justify-center">
        <Logo style={"w-20 h-20"} />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold ">
        Welcome to Chat Buddy
      </h2>
      <p className="mt-2 text-center text-sm ">
        Connect and chat with friends and colleagues
      </p>
    </div>
  );
}

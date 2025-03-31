import React from "react";

export function ShowOtherDetail() {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <p className="text-center text-sm ">
        By using ChatApp, you agree to our
        <a href="#" className="font-medium ">
          {" "}
          Terms of Service
        </a>{" "}
        and
        <a href="#" className="font-medium ">
          {" "}
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

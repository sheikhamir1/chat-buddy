import React from "react";
import { Link } from "react-router";

export function ShowOtherDetail() {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <p className="text-center text-sm ">
        By using ChatApp, you agree to our
        <Link to={"/terms-of-service"} className="font-medium ">
          {" "}
          Terms of Service
        </Link>{" "}
        and
        <Link to={"/privacy-policy"} className="font-medium ">
          {" "}
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

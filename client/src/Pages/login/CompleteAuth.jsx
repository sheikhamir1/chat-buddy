import React from "react";
import { ShowLoginSignUp } from "./ShowLoginSignUp";
import { ShowOtherDetail } from "./ShowOtherDetail";
import { TabsOption } from "./TabsOption";

export function CompleteAuth() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <ShowLoginSignUp />
        <TabsOption />
        <ShowOtherDetail />
      </div>
    </>
  );
}

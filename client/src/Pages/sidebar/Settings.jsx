import React from "react";
import { BackArrowSvg } from "../../Svg/BackArrowSvg";
import { Link } from "react-router";
import { AllThemes } from "../../Components/ThemeSwitcher";

export function Settings() {
  return (
    <>
      <div id="settingsPage" className=" min-h-screen">
        {/* <!-- Settings Header --> */}
        <div className=" shadow border-b">
          <div className="max-w-7xl mx-auto px-8 py-6 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link className="mr-4 p-2 rounded-md " to={"/home"}>
                  <BackArrowSvg />
                </Link>
                <h1 className="text-2xl font-semibold ">Settings</h1>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Settings Content --> */}
        <div className="max-w-7xl mx-auto py-6  px-8 ">
          <div className=" ">
            {/* <!-- Settings Form --> */}
            <div className="shadow rounded-lg ">
              <div className="p-6 border-b ">
                <h2 className="text-xl font-semibold ">General Settings</h2>
                <p className="mt-1 text-sm ">
                  Manage your account preferences and settings
                </p>
              </div>

              {/* <!-- Appearance Section -->/ */}
              <div className="p-6 ">
                <h3 className="text-lg font-medium mb-4">Theme Appearance</h3>
                <AllThemes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

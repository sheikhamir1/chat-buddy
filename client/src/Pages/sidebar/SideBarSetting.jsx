import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { SettingSvg } from "../../Svg/SettingSvg";
import { LogoutSvg } from "../../Svg/LogoutSvg";
import { useStore } from "../../Store";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "../../utils/Spinner.Util";
import { googleLogout } from "@react-oauth/google";

const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? `http://localhost:3000/api/v1/`
    : "https://chat-buddy-bsto.onrender.com/api/v1/";

export function SideBarSetting() {
  // use store
  const { setIsUserLogin, disconnectSocket } = useStore((state) => state);

  const logoutUser = async () => {
    try {
      const response = await fetch(`${baseUrl}auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          ` Status:${response.status}, Message: ${errorData.message}`
        );
      }

      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data, isSuccess, isPending, mutate, error, isError } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser,
    onSuccess: () => {
      console.log("Logout successful");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const navigator = useNavigate();

  const HandleLogout = () => {
    mutate();
    googleLogout();
  };

  useEffect(() => {
    if (isSuccess) {
      toast(data.message, { type: "success" });
      setIsUserLogin(false);
      disconnectSocket();
      navigator("/");
    }
    if (isError) {
      // console.log("error", isError);
      toast(error.message, { type: "error" });
    }
  }, [isError, isSuccess]);

  return (
    <>
      {/* site settings */}
      <Spinner isLoading={isPending} />
      <div className=" px-4 shadow-md ">
        <div className="flex flex-row space-x-2 justify-between pt-4 relative bottom-0">
          {/* Settings */}
          <Link to={"/setting"} className="flex items-center p-2  rounded-md">
            <SettingSvg />
            <span className="ml-3 text-sm">Settings</span>
          </Link>

          {/* Profile */}
          <Link to={"/profile"} className="flex items-center p-2  rounded-md ">
            <img
              className="h-6 w-6  "
              src="https://img.icons8.com/color/48/person-skin-type-7.png"
              alt="person-skin-type-7"
            />
            <span className="ml-3 text-sm">Profile</span>
          </Link>

          {/* Logout */}
          <Link
            onClick={HandleLogout}
            className="flex items-center p-2 rounded-md "
          >
            <LogoutSvg />
            <span className="ml-3 text-sm">Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
}

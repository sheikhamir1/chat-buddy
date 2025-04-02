import React from "react";
import { InputUtil } from "../../Components/InputUtil";
import { GoogleSvg } from "../../Svg/GoogleSvg";
import { FacebookSvg } from "../../Svg/FacebookSvg";
import { InstagramSvg } from "../../Svg/InstagramSvg";
import { ButtonUtil } from "../../Components/ButtonUtil";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { useStore } from "../../Store";

// always change .env before production
const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? `http://localhost:3000/api/v1/`
    : "https://chat-buddy-bsto.onrender.com/api/v1/";

export function LoginForm({ formHandler, register, errors }) {
  const { setIsUserLogin } = useStore((state) => state);
  const navigate = useNavigate();
  // Google login
  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      // Send the token to your backend for verification
      const res = await fetch(`${baseUrl}auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // Send the Google token in the body
      });

      const data = await res.json();

      if (res.ok) {
        setIsUserLogin(true);
        console.log("User authenticated via GoogleAuth:", data.message);
        navigate("/home");
      } else {
        console.error("Authentication failed:", data.message);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleError = (error) => {
    console.log("Login Failed", error);
  };

  return (
    <>
      <div className="loginUtil">
        {/* Sign In Form  */}
        <form className="space-y-6" onSubmit={formHandler}>
          <InputUtil
            label="Email"
            displayLabeLName={"Email address"}
            inputType="email"
            inputName="email"
            register={register}
            errors={errors}
            placeholder={"your@email.com"}
          />
          <InputUtil
            label="password"
            displayLabeLName={"Enter Password"}
            inputType="password"
            inputName="password"
            register={register}
            errors={errors}
            placeholder={"*********"}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm ">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium ">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 p-2 font-medium btn-outline cursor-pointer hover:border-b-blue-700 border-2 hover:transition duration-300 ease-in-out btn"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* google auth */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t "></div>
            </div>
            <div className="relative top-3 flex justify-center text-sm">
              <span className="px-2 ">Or continue with</span>
            </div>
          </div>

          {/* <div className="mt-6 grid grid-cols-3 gap-3 "> */}
          <div className="mt-6 flex justify-center">
            <div className="">
              <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
              >
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
              </GoogleOAuthProvider>
            </div>

            {/* <div>
              <ButtonUtil
                buttonName={<FacebookSvg />}
                style={"w-full inline-flex justify-center py-2 px-4 "}
              />
            </div> */}

            {/* <div>
              <ButtonUtil
                buttonName={<InstagramSvg />}
                style={"w-full inline-flex justify-center py-2 px-4 "}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

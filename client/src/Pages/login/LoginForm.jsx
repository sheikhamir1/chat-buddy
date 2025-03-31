import React from "react";
import { InputUtil } from "../../Components/InputUtil";
import { GoogleSvg } from "../../Svg/GoogleSvg";
import { FacebookSvg } from "../../Svg/FacebookSvg";
import { InstagramSvg } from "../../Svg/InstagramSvg";
import { ButtonUtil } from "../../Components/ButtonUtil";

export function LoginForm({ formHandler, register, errors }) {
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
            <div className="relative flex justify-center text-sm">
              <span className="px-2 ">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <ButtonUtil
                buttonName={<GoogleSvg />}
                style={"w-full inline-flex justify-center py-2 px-4 "}
              />
            </div>

            <div>
              <ButtonUtil
                buttonName={<FacebookSvg />}
                style={"w-full inline-flex justify-center py-2 px-4 "}
              />
            </div>

            <div>
              <ButtonUtil
                buttonName={<InstagramSvg />}
                style={"w-full inline-flex justify-center py-2 px-4 "}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { InputUtil } from "../../Components/InputUtil";
import { ButtonUtil } from "../../Components/ButtonUtil";

export function RegisterForm({ formHandler, register, errors }) {
  return (
    <>
      <form className="space-y-6 pt-[-5px]" onSubmit={formHandler}>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2"></div>

        <InputUtil
          label="fullName"
          displayLabeLName={"Enter fullName"}
          inputType="text"
          inputName="fullName"
          register={register}
          errors={errors}
          placeholder={"John Doe"}
        />

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
          placeholder={"**********"}
        />

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 0 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium ">
              I agree to the
              <a href="#" className=" hover:text-blue-500">
                {" "}
                Terms of Service
              </a>{" "}
              and
              <a href="#" className=" hover:text-blue-500">
                {" "}
                Privacy Policy
              </a>
            </label>
          </div>
        </div>

        <div>
          <ButtonUtil
            buttonName={"Create account"}
            style={"w-full flex justify-center py-2 px-4 text-sm font-medium"}
          />
        </div>
      </form>
    </>
  );
}

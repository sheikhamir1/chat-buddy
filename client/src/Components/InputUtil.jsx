import React, { useEffect, useState } from "react";
import { EyeSvg } from "../Svg/EyeSvg";

export function InputUtil({
  register,
  errors,
  label,
  displayLabeLName,
  inputType,
  inputName,
  placeholder,
  disabled,
}) {
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (inputType === "password") {
      inputType = "password";
    } else if (inputType === "email") {
      inputType = "email";
    } else if (inputType === "text") {
      inputType = "text";
    }
  }, [inputType]);

  return (
    <>
      <div>
        <label htmlFor={label} className="block text-sm font-medium ">
          {displayLabeLName}
        </label>
        <div className="mt-1 relative">
          <input
            readOnly={disabled}
            autoComplete="off"
            name={inputName}
            type={inputType === "password" && showPass ? "text" : inputType}
            className=" block w-full px-3 py-2 sm:text-sm input"
            placeholder={placeholder}
            {...register(`${inputName}`, {
              required: `${inputName} is required`,
            })}
          />
          {errors && errors[inputName] && (
            <p className="text-red-500 text-xs">
              {errors[`${inputName}`].message}
            </p>
          )}
          {inputType === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              <EyeSvg />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

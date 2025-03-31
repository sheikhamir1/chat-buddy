import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

export function TabsOption() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };
  const handleRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex border-b mb-6">
            <button
              className={`py-4 px-1 border-t-2 ${
                showLogin ? " " : "border-transparent"
              }  font-medium text-sm  focus:outline-none w-1/2 text-center cursor-pointer `}
              onClick={handleLogin}
            >
              Sign In
            </button>

            <button
              className={`py-4 px-1 border-t-2 ${
                showRegister ? "  " : "border-transparent "
              } font-medium text-sm   focus:outline-none w-1/2 text-center cursor-pointer`}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>

          {showLogin ? <Login /> : null}

          {showRegister ? <Register /> : null}
        </div>
      </div>
    </>
  );
}

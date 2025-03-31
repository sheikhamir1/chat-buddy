import React from "react";
import { RingLoader } from "react-spinners";
export const Spinner = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full  flex justify-center items-center z-80">
          <div className="w-16 h-16  border-gray-200">
            <RingLoader color="#000" size={65} />
          </div>
        </div>
      )}
    </>
  );
};
// color="#00659d"

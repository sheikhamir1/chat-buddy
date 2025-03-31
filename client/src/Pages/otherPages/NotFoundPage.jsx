import React from "react";

export const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {/* 404 Error Message */}
        <h1 className="text-5xl font-bold text-primary mb-4 animate__animated animate__fadeIn animate__delay-1s">
          404
        </h1>
        <h2 className="text-xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-2s">
          Oops! Page Not Found
        </h2>
        <p className=" mb-6 animate__animated animate__fadeIn animate__delay-3s">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Animation of an Icon (Optional) */}
        <div className="animate__animated animate__bounce animate__delay-4s">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-primary mb-6 mx-auto animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Button to go back to the homepage */}
        <div className="animate__animated animate__fadeIn animate__delay-5s">
          <a href="/" className="btn btn-primary">
            Go Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

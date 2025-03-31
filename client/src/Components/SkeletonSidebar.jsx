import React from "react";

export const SkeletonSidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">
        <div className="h-6 bg-gray-600 rounded w-24"></div>{" "}
        {/* Title Skeleton */}
      </h2>
      <div className="flex flex-col space-y-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex items-center p-2 rounded-lg bg-gray-700 animate-pulse"
          >
            {/* Placeholder for the status circle */}
            <div className="w-3 h-3 bg-gray-600 rounded-full mr-3"></div>

            {/* Placeholder for the user name */}
            <div className="w-32 h-4 bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from "react";

export const LandingPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center text-base-content">
      {/* Hero Section Content */}
      <div className="space-y-6 p-6">
        {/* Main Heading */}
        <h1 className="text-5xl font-extrabold animate__animated animate__fadeIn animate__delay-1s">
          Meet Chat Buddy – Your New Chat Assistant!
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl max-w-2xl mx-auto animate__animated animate__fadeIn animate__delay-2s">
          Connect, communicate, and collaborate effortlessly with Chat Buddy.
          It's more than just a chat app – it's your assistant.
        </p>

        {/* Call-to-Action Button */}
        <div className="animate__animated animate__fadeIn animate__delay-3s">
          <a
            href="#get-started"
            className="btn btn-primary text-lg px-8 py-3 rounded-lg"
          >
            Get Started
          </a>
        </div>

        {/* Animated Chat Bubbles */}
        <div className="animate__animated animate__fadeIn animate__delay-4s">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-6 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h8M8 14h8M8 18h8"
            />
          </svg>
        </div>
      </div>

      {/* Feature Section */}
      <div className="bg-base-200 py-12 px-6 md:px-24 space-y-8 max-w-4xl mx-auto rounded-lg shadow-lg">
        <h2 className="text-4xl font-semibold text-center">Why Chat Buddy?</h2>
        <p className="text-xl text-center mb-8">
          Explore the features that make Chat Buddy your perfect assistant.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-primary mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2L2 12h3v8h4v-6h6v6h4v-8h3L12 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold">Fast Setup</h3>
            <p className="text-center text-gray-600">
              Quick and easy to set up with instant chat access.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-primary mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 12l-8 4.5V5.5L12 1l8 4.5v11L12 12z"
              />
            </svg>
            <h3 className="text-xl font-semibold">Real-time Messaging</h3>
            <p className="text-center text-gray-600">
              Enjoy seamless and fast real-time messaging with anyone, anywhere.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-primary mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h8M8 14h8M8 18h8"
              />
            </svg>
            <h3 className="text-xl font-semibold">Stay Connected</h3>
            <p className="text-center text-gray-600">
              Never miss a message. Stay connected on multiple devices
              effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-base-300 text-base-content py-6 w-full">
        <div className="text-center">
          <p>&copy; 2025 Chat Buddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

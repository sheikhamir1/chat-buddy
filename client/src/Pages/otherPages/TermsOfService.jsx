import React from "react";

export const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 h-screen">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-semibold mb-4">Terms of Service</h1>
          <p className="mb-4">
            By using Chat buddy, you agree to the following Terms of Service:
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p>
              Chat buddy is a demo and testing project created to showcase the
              skills of its developer. By using this app, you agree to these
              terms.
            </p>

            <h2 className="text-2xl font-semibold">2. User Responsibilities</h2>
            <p>
              You agree to use Chat buddy for lawful purposes and not to misuse
              the app.
            </p>

            <h2 className="text-2xl font-semibold">
              3. Limitation of Liability
            </h2>
            <p>
              As this is a demo project, Chat buddy is provided "as is," and we
              are not responsible for any losses or damages arising from its
              use.
            </p>

            <h2 className="text-2xl font-semibold">4. Modifications</h2>
            <p>
              These terms may change at any time. Users should review the terms
              periodically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

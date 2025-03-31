import React from "react";

export const PrivacyPolicy = () => {
  return (
    <div className="card-body h-screen">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At Chat buddy, we take your privacy seriously. Since this is a demo app,
        we do not collect sensitive personal information. Any data we may
        collect (e.g., usage data) will be used strictly for improving the app’s
        performance and testing purposes.
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">1. Information Collected</h2>
        <p>We collect usage data to monitor the app's performance.</p>

        <h2 className="text-2xl font-semibold">2. Data Usage</h2>
        <p>
          Your data will be used solely for improving the functionality of the
          app.
        </p>

        <h2 className="text-2xl font-semibold">3. Security</h2>
        <p>
          We take reasonable steps to protect your information, though we cannot
          guarantee complete security for a demo project.
        </p>

        <h2 className="text-2xl font-semibold">5. Changes to This Policy</h2>
        <p>
          We may update this policy, and users are encouraged to review it
          regularly.
        </p>
      </div>
    </div>
  );
};

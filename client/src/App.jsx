import React, { useEffect } from "react";
import { HomePage } from "./Pages/HomePage";

import { UserProfile } from "./Pages/sidebar/UserProfile";
import { Settings } from "./Pages/sidebar/Settings.jsx";

import { Routes, Route, Navigate } from "react-router";
import { useStore } from "./Store.jsx";
import { CompleteAuth } from "./Pages/login/CompleteAuth.jsx";
import { TermsOfService } from "./Pages/otherPages/TermsOfService.jsx";
import { PrivacyPolicy } from "./Pages/otherPages/PrivacyPolicy.jsx";
import { NotFoundPage } from "./Pages/otherPages/NotFoundPage.jsx";
import { LandingPage } from "./Pages/otherPages/LandingPage.jsx";

const App = () => {
  const { isUserLogin, onRefresh } = useStore((state) => state);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <Routes>
        {/* protected routes */}

        <Route
          path="/home"
          element={isUserLogin === true ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isUserLogin === true ? <UserProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/setting"
          element={isUserLogin === true ? <Settings /> : <Navigate to="/" />}
        />

        {/* public routes */}
        <Route path="/auth" element={<CompleteAuth />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;

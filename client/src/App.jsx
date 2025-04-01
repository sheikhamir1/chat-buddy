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
import { ProtectedRoutes } from "./Components/ProtectedRoutes.jsx";

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
          element={
            <ProtectedRoutes isAuthenticated={isUserLogin}>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes isAuthenticated={isUserLogin}>
              <UserProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoutes isAuthenticated={isUserLogin}>
              <Settings />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/auth"
          element={
            isUserLogin === true ? <Navigate to="/home" /> : <CompleteAuth />
          }
        />

        {/* public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<CompleteAuth />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;

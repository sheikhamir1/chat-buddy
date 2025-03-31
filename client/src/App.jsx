import React, { useEffect } from "react";
import { HomePage } from "./Pages/HomePage";

import { UserProfile } from "./Pages/sidebar/UserProfile";
import { Settings } from "./Pages/sidebar/Settings.jsx";

import { Routes, Route, Navigate } from "react-router";
import { useStore } from "./Store.jsx";
import { CompleteAuth } from "./Pages/login/CompleteAuth.jsx";

const App = () => {
  const { isUserLogin, onRefresh } = useStore((state) => state);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <Routes>
        <Route
          index
          element={
            isUserLogin === true ? <Navigate to="/home" /> : <CompleteAuth />
          }
        />

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
      </Routes>
    </>
  );
};

export default App;

import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import appRouteNameConstants from "./constants/routes";
import LoginPage from "./pages/LoginPage";
import AuthenticatedPage from "./components/AuthenticatedPage";
import CreateMissionPage from "./pages/CreateMissionPage";
import MissionDetailsPage from "./pages/MissionDetailsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to={appRouteNameConstants.HOME} />}
          />
          <Route path={appRouteNameConstants.LOGIN} element={<LoginPage />} />
          {/* <Route element={<AuthenticatedPage />}> */}
          <Route path={appRouteNameConstants.HOME} element={<HomePage />} />
          <Route
            path={appRouteNameConstants.CREATE}
            element={<CreateMissionPage />}
          />
          <Route
            path={appRouteNameConstants.MISSION_DETAILS}
            element={<MissionDetailsPage />}
          />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

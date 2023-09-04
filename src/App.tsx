import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import appRouteNameConstants from "./constants/routes";
import LoginPage from "./pages/LoginPage";
import AuthenticatedPage from "./components/AuthenticatedPage";
import CreateMissionPage from "./pages/CreateMissionPage";

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
            <Route path="/home" element={<HomePage />} />
            <Route path="/create" element={<CreateMissionPage />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

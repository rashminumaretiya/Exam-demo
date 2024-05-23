import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("loggedUserData"));
  if (isLoggedIn?.token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;

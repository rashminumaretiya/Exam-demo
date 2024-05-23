import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useJwt } from "react-jwt";

const ProtectedRoute = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("loggedUserData"));
  const token = isLoggedIn?.token;
  const { isExpired } = useJwt(token);
  if (isExpired) {
    localStorage.removeItem("loggedUserData");
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

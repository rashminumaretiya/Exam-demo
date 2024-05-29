import React, { lazy } from "react";
import Layout from "../presentation/layout";
import ProtectedRoute from "../auth/ProtectedRoute";
import PublicRoute from "../auth/PublicRoute";
import NewPassword from "../presentation/newPassword";
import ExamPaper from "../presentation/student/examPaper";
import CreateExam from "../presentation/createExam";
import ViewStudentDetail from "../presentation/ViewStudentDetail";
import ViewExam from "../presentation/viewExam";

const Login = lazy(() => import("../presentation/login"));
const Register = lazy(() => import("../presentation/register"));
const Home = lazy(() => import("../presentation/home"));
const ForgotPassword = lazy(() => import("../presentation/forgotPassword"));
const NotFound = lazy(() => import("../presentation/pageNotFound"));

const publicRoutes = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/newPassword",
        element: <NewPassword />,
      },
    ],
  },
];

const protectedRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/student/examPaper",
            element: <ExamPaper />,
          },
          {
            path: "/dashboard/Teachers/viewStudentDetail",
            element: <ViewStudentDetail />,
          },
          {
            path: "/create-exam",
            element: <CreateExam />,
          },
          {
            path: "/view-exam",
            element: <ViewExam />,
          },
          {
            path: "/*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
];

const routes = [...publicRoutes, ...protectedRoutes];

export default routes;

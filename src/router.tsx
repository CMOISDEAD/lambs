import { createBrowserRouter } from "react-router-dom";

import { Root } from "./components/layouts/Root.tsx";
import { Dashboard } from "./pages/Dashboard/Dashboard.tsx";
import { Exam } from "./pages/Exam/Exam.tsx";
import { Overview } from "./pages/Exam/Overview.tsx";
import Home from "./pages/Home.tsx";
import { Login } from "./pages/Login.tsx";
import { Profile } from "./pages/Profile.tsx";
import { Register } from "./pages/Register.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/exam/:code",
        element: <Exam />,
      },
      {
        path: "/exam/overview/:id",
        element: <Overview />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

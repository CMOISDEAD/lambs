import { createBrowserRouter } from "react-router-dom";

import { Root } from "./components/layouts/Root.tsx";
import { Exam } from "./pages/Exam/Exam.tsx";
import Home from "./pages/Home.tsx";
import { Login } from "./pages/Login.tsx";

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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

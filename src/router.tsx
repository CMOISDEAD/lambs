import { createBrowserRouter } from "react-router-dom";
import { Exam } from "./pages/Exam/Exam.tsx";
import { Root } from "./components/layouts/Root.tsx";
import Home from "./pages/Home.tsx";

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
]);

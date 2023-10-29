import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";

export const Root = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
};

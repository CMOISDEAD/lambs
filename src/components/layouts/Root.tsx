import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { refresh } from "../../utils";
import { Navbar } from "../Navbar";

export const Root = () => {
  useEffect(() => {
    (async () => {
      refresh();
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
};

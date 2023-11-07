import React from "react";
import ReactDOM from "react-dom/client";
import { Providers } from "./components/layouts/Providers.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import 'katex/dist/katex.min.css';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});

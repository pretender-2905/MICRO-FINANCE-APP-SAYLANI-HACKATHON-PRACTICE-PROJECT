import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </React.StrictMode>
);

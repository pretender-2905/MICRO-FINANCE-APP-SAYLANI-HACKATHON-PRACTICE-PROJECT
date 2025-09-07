import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import { BrowserRouter} from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
     {/* <React.StrictMode> */}
      <HeroUIProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </HeroUIProvider>
     {/* </React.StrictMode> */}
  </AuthContextProvider>
);

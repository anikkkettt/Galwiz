import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { LoginModalContextProvider } from "./store/openLoginModal-context";
import { UserDataContextProvider } from "./store/userData-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserDataContextProvider>
    <LoginModalContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginModalContextProvider>
  </UserDataContextProvider>
);

reportWebVitals();

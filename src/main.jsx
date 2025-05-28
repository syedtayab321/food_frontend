import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Services/store.js";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthWrapper from './Routes/AuthWrapper.jsx'
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <AuthWrapper>
          <App />
        </AuthWrapper>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

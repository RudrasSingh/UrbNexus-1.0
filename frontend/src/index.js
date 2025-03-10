import React from "react";
import "./index.css";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const container = document.getElementById("root");
import "leaflet/dist/leaflet.css";

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      {" "}
      {/* Capitalize 'Provider' */}
      <App />
    </Provider>
  </BrowserRouter>
);

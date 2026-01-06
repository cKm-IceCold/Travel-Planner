import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // React Router library
import App from "./App";
import "./index.css"; // Global styles (Tailwind)

import { ItineraryProvider } from "./context/ItineraryContext";
import { BlogProvider } from "./context/BlogContext";
import { AuthProvider } from "./context/AuthContext";
import { TripProvider } from "./context/TripContext";

// We need BrowserRouter at the top level to enable routing in our app.
// It wraps the entire App and keeps track of the URL in the browser.
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <TripProvider>
        <ItineraryProvider>
          <BlogProvider>
            <App />
          </BlogProvider>
        </ItineraryProvider>
      </TripProvider>
    </AuthProvider>
  </BrowserRouter>
);

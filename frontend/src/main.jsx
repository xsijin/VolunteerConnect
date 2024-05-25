import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/Layout/Layout";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import Scenarios from "./pages/Scenarios/Scenarios";
import Performance from "./pages/Performance/Performance";
import Instructions from "./pages/Home/Instructions";

import Home from "./pages/Home/Home";
import { Roleplay } from "./pages/Roleplay/Roleplay";
import Profile from "./pages/Profile/Profile";

// https://mantine.dev/theming/default-theme/
const theme = createTheme({
  // fontFamily: "Montserrat, sans-serif",
  // fontFamily: "Verdana, sans-serif",
  fomrFamily: "Lato, sans-serif",
  defaultRadius: "md",
  cursorType: "pointer",
  primaryColor: "yellow",
  headings: {
    fontFamily: "Poppins, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Notifications />
        <Routes>
          {/* Root */}
          <Route path="/" element={<Layout />}>
            {/* Root */}
            <Route path="/" element={<Home />} />
            "
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/performance/:id" element={<Performance />} />
            <Route path="/roleplay/:id" element={<Roleplay />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MantineProvider>
    </Router>
  </React.StrictMode>
);

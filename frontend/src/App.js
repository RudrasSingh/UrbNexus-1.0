import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "../src/pages/LandingPages/SignIn";
import SignUp from "../src/pages/LandingPages/SignUp";

//Dashboard 2 sections
import Completed from "../src/pages/LandingPages/Dashboard2/sections/pages/Completed";
import Inprogress from "../src/pages/LandingPages/Dashboard2/sections/pages/Inprogress";
import ToDo from "../src/pages/LandingPages/Dashboard2/sections/pages/ToDo";
import Trash from "../src/pages/LandingPages/Dashboard2/sections/pages/Trash";
import DashboardTask from "../src/pages/LandingPages/Dashboard2/sections/pages/DashboardTask";
import TeamDashboard from "../src/pages/LandingPages/Dashboard2/sections/pages/TeamDashboard";
import Dashboard2 from "../src/pages/LandingPages/Dashboard2";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

// Material Kit 2 React routes
import routes from "routes";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/presentation" element={<Presentation />} />
        <Route path="*" element={<Navigate to="/presentation" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Dashboard 2 routes */}
        <Route path="/completed" element={<Completed />} />
        <Route path="/inprogress" element={<Inprogress />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/dashboardtask" element={<DashboardTask />} />
        <Route path="/teamdashboard" element={<TeamDashboard />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
      </Routes>
    </ThemeProvider>
  );
}

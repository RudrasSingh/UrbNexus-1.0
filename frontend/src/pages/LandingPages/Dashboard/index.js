// Dashboard.js
import React from "react";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import MKBox from "components/MKBox";
import footerRoutes from "footer.routes";
import DefaultFooter from "examples/Footers/DefaultFooter";
import DashboardStats from "./sections/TaskRecord";
import PriorityChart from "./sections/PriorityChart";
import TaskList from "./sections/TaskList";

import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Sample tasks data for demonstration

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserState = useSelector((state) => state.userData);
  const label = UserState == null ? "Sign In" : "Sign Out";

  const handleActionClick = () => {
    if (UserState == null) {
      navigate("/signin"); // Redirect to the SignIn page
    } else {
      dispatch(logoutUser());
      alert("LOGGED OUT SUCCESSFULLY");
    }
  };
  const filterRoutes = (routes) => {
    return routes
      .filter(
        (route) =>
          route.name !== "Dashboard" &&
          route.name !== "Dept." &&
          route.name !== "Create Task" &&
          route.name !== "Add Inventory"
      )
      .map((route) => {
        // If a route has a `collapse` property, we need to filter it recursively
        if (route.collapse) {
          return {
            ...route,
            collapse: filterRoutes(route.collapse), // Recursively filter the collapse array
          };
        }
        return route;
      });
  };
  const filteredRoutes = UserState ? routes : filterRoutes(routes);
  return (
    <MKBox sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <MKBox
        position="fixed"
        top="0.5rem"
        width="100%"
        sx={{ backgroundColor: "white", zIndex: 1 }}
      >
        <DefaultNavbar
          routes={filteredRoutes}
          action={{
            type: "internal",
            label: label,
            color: "info",
            functions: handleActionClick, // Use the function directly
          }}
          sticky
        />
      </MKBox>

      <MKBox mt={8} pt={6} pb={3} pr={6} pl={6} sx={{ backgroundColor: "white", borderRadius: 2 }}>
        <DashboardStats />
      </MKBox>

      <MKBox pt={3} pb={3} sx={{ backgroundColor: "white", borderRadius: 2 }}>
        <PriorityChart />
      </MKBox>

      <MKBox pt={3} pb={3} sx={{ backgroundColor: "white", borderRadius: 2 }}>
        <TaskList />
      </MKBox>

      <MKBox pt={6} px={1} mt={6} mb={0} sx={{ backgroundColor: "white", borderRadius: 2 }}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </MKBox>
  );
};

export default Dashboard;

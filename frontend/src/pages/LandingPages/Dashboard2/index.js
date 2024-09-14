import React from "react";
import Sidebar from "./sections/Sidebar";
import Card from "./sections/Card";
import Chart from "./sections/Chart";
import TaskList from "./sections/TaskList";
import "./dashboard2.css"; // Add your CSS here

//navbar and footer
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import MKBox from "components/MKBox";
import footerRoutes from "footer.routes";
import DefaultFooter from "examples/Footers/DefaultFooter";

import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserState = useSelector((state) => state.userData);
  const label = UserState == null ? "Sign In" : "Sign Out";

  const handleActionClick = () => {
    if (UserState == null) {
      navigate("/signin"); // Redirect to the SignIn page
    } else {
      dispatch(logoutUser());
      alert("Logged out successfully");
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
    <>
      <MKBox
        position="fixed"
        top="0.5rem"
        width="100%"
        display="flex"
        justifyContent="center"
        zIndex="200"
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

      <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
          <div className="header">
            <h2>Dashboard</h2>
            <input type="text" placeholder="Search..." />
          </div>

          <div className="cards">
            <Card title="Total Task" number="10" subText="110 last month" icon="📄" />
            <Card title="Completed Task" number="1" subText="110 last month" icon="✅" />
            <Card title="Task In Progress" number="3" subText="110 last month" icon="🔄" />
            <Card title="Todos" number="6" subText="110 last month" icon="📋" />
          </div>

          <Chart />
          <TaskList />
        </div>
      </div>
      <MKBox pt={6} px={1} mt={6} mb={0}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Dashboard2;

import React from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import routes from "routes";
import footerRoutes from "footer.routes";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import MKBox from "components/MKBox";
import TaskCard from "../Task/TaskCard"; // Import TaskCard from the correct path
import tasksData from "../DummyJson/Ministry_Task.json";
import { database } from "../DummyJson/login"; // Import the database with ministry details
import "../Task/Task.css"; // Import the CSS file for grid styling

import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/action";
import { useNavigate } from "react-router-dom";

const DepartmentTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserState = useSelector((state) => state.user.userData);
  const label = UserState == null ? "Sign In" : "Sign Out";

  const handleActionClick = () => {
    if (UserState == null) {
      navigate("/signin"); // Redirect to the SignIn page
    } else {
      dispatch(logoutUser());
      alert("Logout Successful");
    }
  };
  // Get the signed-in user's ministry ID from Redux state
  const userData = useSelector((state) => state.user.userData);
  const signedInMinistryId = userData ? userData.id : null;
  console.log(userData.id);
  // Create a mapping of ministry ID to ministry name
  const ministryMap = database.ministries.reduce((acc, ministry) => {
    acc[ministry.id] = ministry.name;
    return acc;
  }, {});

  // Filter tasks based on the signed-in user's ministry ID
  const filteredTasks = tasksData.tasks.filter((task) => task.ministry_id === signedInMinistryId);
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
      <MKBox position="fixed" top="0.5rem" width="100%">
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
      <MKBox pt={6} px={1} mt={6}>
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.task_id}
              ministry={`Ministry: ${ministryMap[task.ministry_id]}`} // Display the ministry name
              taskTitle={task.title}
              dateAssigned="2024-09-01"
              description={task.description}
              deadline={task.status}
            />
          ))}
        </div>
      </MKBox>
      <MKBox pt={6} px={1} mt={6} mb={0}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default DepartmentTask;

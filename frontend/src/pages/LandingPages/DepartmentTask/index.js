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

const DepartmentTask = () => {
  // Get the signed-in user's ministry ID from Redux state
  const userData = useSelector((state) => state.userData);
  const signedInMinistryId = userData ? userData.userId : null;

  // Create a mapping of ministry ID to ministry name
  const ministryMap = database.ministries.reduce((acc, ministry) => {
    acc[ministry.id] = ministry.name;
    return acc;
  }, {});

  // Filter tasks based on the signed-in user's ministry ID
  const filteredTasks = tasksData.tasks.filter((task) => task.ministry_id === signedInMinistryId);

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "/*give dashboard route*/",
            label: "Dashboard",
            color: "info",
          }}
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

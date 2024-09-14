import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo, faRedo } from "@fortawesome/free-solid-svg-icons";
import "./TrashedTasks.css";
import Sidebar from "../Sidebar";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../redux/action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
const TrashedTasks = () => {
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
  const tasks = [
    { title: "Test task", priority: "High", stage: "Todo", date: "Fri Feb 09 2024", color: "blue" },
    {
      title: "Duplicate - Duplicate - Review Code Changes",
      priority: "Medium",
      stage: "In Progress",
      date: "Fri Feb 09 2024",
      color: "orange",
    },
    {
      title: "Website Project Proposal Review",
      priority: "High",
      stage: "Todo",
      date: "Wed Feb 07 2024",
      color: "blue",
    },
    {
      title: "Task Manager Youtube Video",
      priority: "Medium",
      stage: "Completed",
      date: "Sun Feb 11 2024",
      color: "green",
    },
    {
      title: "Bug Fixing",
      priority: "High",
      stage: "Todo",
      date: "Wed Feb 07 2024",
      color: "blue",
    },
    {
      title: "Duplicate - Website Project Proposal",
      priority: "High",
      stage: "Todo",
      date: "Wed Feb 07 2024",
      color: "blue",
    },
    {
      title: "Duplicate - Review Code Changes",
      priority: "Medium",
      stage: "In Progress",
      date: "Wed Feb 07 2024",
      color: "orange",
    },
    {
      title: "Review Code Changes",
      priority: "Normal",
      stage: "Todo",
      date: "Wed Feb 07 2024",
      color: "gray",
    },
    {
      title: "Website Project Proposal",
      priority: "High",
      stage: "Todo",
      date: "Wed Feb 07 2024",
      color: "blue",
    },
  ];

  const handleRestoreAll = () => {
    alert("Restore All button clicked!");
  };

  const handleDeleteAll = () => {
    alert("Delete All button clicked!");
  };

  const handleRestoreTask = (taskTitle) => {
    alert(`Restore ${taskTitle} clicked!`);
  };

  const handleDeleteTask = (taskTitle) => {
    alert(`Delete ${taskTitle} clicked!`);
  };

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
      <Sidebar></Sidebar>
      <div className="trashed-tasks-container">
        <div className="header">
          <h1>Trashed Tasks</h1>
          <div className="header-actions">
            <button className="restore-all" onClick={handleRestoreAll}>
              <FontAwesomeIcon icon={faRedo} /> Restore All
            </button>
            <button className="delete-all" onClick={handleDeleteAll}>
              <FontAwesomeIcon icon={faTrash} /> Delete All
            </button>
          </div>
        </div>
        <div className="task-table">
          <div className="table-header">
            <div>Task Title</div>
            <div>Priority</div>
            <div>Stage</div>
            <div>Modified On</div>
          </div>
          {tasks.map((task, index) => (
            <div key={index} className="table-row">
              <div className="task-title">
                <span className={`task-dot ${task.color}`}></span>
                {task.title}
              </div>
              <div className="task-priority">{task.priority}</div>
              <div className="task-stage">{task.stage}</div>
              <div className="task-date">
                {task.date}
                <button
                  className="restore-btn"
                  title={`Restore ${task.title}`}
                  onClick={() => handleRestoreTask(task.title)}
                >
                  <FontAwesomeIcon icon={faUndo} />
                </button>
                <button
                  className="delete-btn"
                  title={`Delete ${task.title}`}
                  onClick={() => handleDeleteTask(task.title)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MKBox pt={6} px={1} mt={6} mb={0}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default TrashedTasks;

import React, { useState } from "react";
import "./task.css"; // Optional CSS for styling (if needed)
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

const TaskManager = () => {
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
  const [view] = useState("board"); // View toggle state
  // eslint-disable-next-line no-unused-vars
  const [tasks, setTasks] = useState({
    todo: [
      {
        title: "Test Task",
        priority: "high",
        date: "9-Feb-2024",
        description: "Task manager youtube tutorial",
        assignees: "AJ JS CA",
        status: "0/1",
      },
    ],
    inProgress: [
      {
        title: "Review Code Changes",
        priority: "medium",
        date: "9-Feb-2024",
        description: "Blog App Admin Dashboard",
        assignees: "EW AJ",
        status: "0/1",
      },
    ],
    completed: [
      {
        title: "Website Project Proposal Review",
        priority: "high",
        date: "7-Feb-2024",
        description: "Blog App Dashboard",
        assignees: "JS JD CA",
        status: "0/2",
      },
    ],
  });

  const handleCreateTask = () => {
    alert("Create task button clicked!");
    // Logic to add task can go here
  };

  const handleAddTask = (category) => {
    alert(`Add task to ${category} clicked!`);
    // Logic to add a task in the respective category can go here
  };

  const handleAddSubtask = (task) => {
    alert(`Add subtask to ${task.title} clicked!`);
    // Logic to add a subtask can go here
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
      <div className="task-container">
        <div className="task-header">
          <h1>Tasks</h1>
          <button className="create-task-btn" onClick={handleCreateTask}>
            + Create Task
          </button>
        </div>

        {view === "board" ? (
          <div className="task-columns">
            {/* To Do Column */}
            <div className="task-column">
              <div className="task-category-header">
                <span className="category-label to-do"></span>
                <span>To Do</span>
                <button className="add-task-btn" onClick={() => handleAddTask("todo")}>
                  +
                </button>
              </div>
              {tasks.todo.map((task, index) => (
                <div key={index} className="task-card">
                  <div className={`task-priority ${task.priority}-priority`}>
                    {task.priority.toUpperCase()} PRIORITY
                  </div>
                  <h2>{task.title}</h2>
                  <p className="task-date">{task.date}</p>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span className="task-status">{task.status}</span>
                    <span className="assignees">{task.assignees}</span>
                  </div>
                  <button className="add-subtask-btn" onClick={() => handleAddSubtask(task)}>
                    Add Subtask
                  </button>
                </div>
              ))}
            </div>

            {/* In Progress Column */}
            <div className="task-column">
              <div className="task-category-header">
                <span className="category-label in-progress"></span>
                <span>In Progress</span>
                <button className="add-task-btn" onClick={() => handleAddTask("inProgress")}>
                  +
                </button>
              </div>
              {tasks.inProgress.map((task, index) => (
                <div key={index} className="task-card">
                  <div className={`task-priority ${task.priority}-priority`}>
                    {task.priority.toUpperCase()} PRIORITY
                  </div>
                  <h2>{task.title}</h2>
                  <p className="task-date">{task.date}</p>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span className="task-status">{task.status}</span>
                    <span className="assignees">{task.assignees}</span>
                  </div>
                  <button className="add-subtask-btn" onClick={() => handleAddSubtask(task)}>
                    Add Subtask
                  </button>
                </div>
              ))}
            </div>

            {/* Completed Column */}
            <div className="task-column">
              <div className="task-category-header">
                <span className="category-label completed"></span>
                <span>Completed</span>
                <button className="add-task-btn" onClick={() => handleAddTask("completed")}>
                  +
                </button>
              </div>
              {tasks.completed.map((task, index) => (
                <div key={index} className="task-card">
                  <div className={`task-priority ${task.priority}-priority`}>
                    {task.priority.toUpperCase()} PRIORITY
                  </div>
                  <h2>{task.title}</h2>
                  <p className="task-date">{task.date}</p>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span className="task-status">{task.status}</span>
                    <span className="assignees">{task.assignees}</span>
                  </div>
                  <button className="add-subtask-btn" onClick={() => handleAddSubtask(task)}>
                    Add Subtask
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="list-view">
            {/* Implement list view structure here */}
            <p>List View not yet implemented</p>
          </div>
        )}
      </div>
      <MKBox pt={6} px={1} mt={6} mb={0}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default TaskManager;

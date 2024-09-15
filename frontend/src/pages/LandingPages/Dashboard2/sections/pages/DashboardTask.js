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
import { FaPlus } from "react-icons/fa"; // Import plus icon

// Task Modal Component
// eslint-disable-next-line react/prop-types
const TaskModal = ({ show, onClose, onSave, taskData, isEditing }) => {
  const [task, setTask] = useState(
    taskData || {
      title: "",
      priority: "low",
      date: "",
      description: "",
      assignees: "",
      status: "todo",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(task);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEditing ? "Edit Task" : "Create Task"}</h2>
        <label>
          Title:
          <input type="text" name="title" value={task.title} onChange={handleChange} />
        </label>
        <label>
          Priority:
          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Date:
          <input type="date" name="date" value={task.date} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={task.description} onChange={handleChange} />
        </label>
        <label>
          Assignees:
          <input type="text" name="assignees" value={task.assignees} onChange={handleChange} />
        </label>
        <div className="modal-actions">
          <button onClick={handleSave}>{isEditing ? "Save" : "Create"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

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

  const [tasks, setTasks] = useState({
    todo: [
      {
        title: "Test Task",
        priority: "high",
        date: "2024-02-09",
        description: "Task manager youtube tutorial",
        assignees: "AJ JS CA",
        status: "todo",
      },
    ],
    inProgress: [
      {
        title: "Review Code Changes",
        priority: "medium",
        date: "2024-02-09",
        description: "Blog App Admin Dashboard",
        assignees: "EW AJ",
        status: "inProgress",
      },
    ],
    completed: [
      {
        title: "Website Project Proposal Review",
        priority: "high",
        date: "2024-02-07",
        description: "Blog App Dashboard",
        assignees: "JS JD CA",
        status: "completed",
      },
    ],
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editingTask, setEditingTask] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("todo");

  const openModal = (category, task = null) => {
    setCurrentCategory(category);
    setCurrentTask(task);
    setEditingTask(!!task);
    setModalOpen(true);
  };

  const handleCreateTask = () => {
    openModal("todo");
  };

  const handleAddTask = (category) => {
    openModal(category);
  };

  const handleSaveTask = (task) => {
    if (editingTask) {
      // Update the task
      setTasks((prev) => {
        const updatedTasks = { ...prev };
        updatedTasks[currentCategory] = updatedTasks[currentCategory].map((t) =>
          t.title === currentTask.title ? task : t
        );
        return updatedTasks;
      });
    } else {
      // Add the new task
      setTasks((prev) => ({
        ...prev,
        [currentCategory]: [...prev[currentCategory], task],
      }));
    }
  };

  const handleStatusChange = (task, newStatus) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };

      // Remove the task from the current category
      updatedTasks[task.status] = updatedTasks[task.status].filter((t) => t.title !== task.title);

      // Add the task to the new category
      task.status = newStatus; // Update the status
      updatedTasks[newStatus] = [...updatedTasks[newStatus], task];

      return updatedTasks;
    });
  };

  const handleEditTask = (task) => {
    openModal(currentCategory, task);
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
            functions: handleActionClick,
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
                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task, e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <FaPlus className="edit-icon" onClick={() => handleEditTask(task)} />
                </div>
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
                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task, e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <FaPlus className="edit-icon" onClick={() => handleEditTask(task)} />
                </div>
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
                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task, e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <FaPlus className="edit-icon" onClick={() => handleEditTask(task)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Modal for creating and editing tasks */}
      <TaskModal
        show={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
        taskData={currentTask}
        isEditing={editingTask}
      />

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default TaskManager;

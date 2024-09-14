import React, { useState } from "react";
import "./task.css"; // Optional CSS for styling (if needed)

const TaskManager = () => {
  const [view, setView] = useState("board"); // View toggle state
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

  const handleViewToggle = (newView) => {
    setView(newView);
  };

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
    <div className="task-container">
      <div className="task-header">
        <h1>Tasks</h1>
        <div className="view-toggle">
          <button
            className={`view-button ${view === "board" ? "active" : ""}`}
            onClick={() => handleViewToggle("board")}
          >
            Board View
          </button>
          <button
            className={`view-button ${view === "list" ? "active" : ""}`}
            onClick={() => handleViewToggle("list")}
          >
            List View
          </button>
        </div>
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
  );
};

export default TaskManager;

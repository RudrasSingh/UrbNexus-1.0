import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo, faRedo } from "@fortawesome/free-solid-svg-icons";
import "./TrashedTasks.css"; // Optional CSS file for styling

const TrashedTasks = () => {
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
  );
};

export default TrashedTasks;

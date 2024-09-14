import React from "react";
import { Link } from "react-router-dom";
import TaskManager from "./task";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>TaskMe</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="./task" component={TaskManager}>
            Tasks
          </Link>
        </li>
        <li>
          <Link to="/completed">Completed</Link>
        </li>
        <li>
          <Link to="/in-progress">In Progress</Link>
        </li>
        <li>
          <Link to="/to-do">To Do</Link>
        </li>
        <li>
          <Link to="/team">Team</Link>
        </li>
        <li>
          <Link to="/trash">Trash</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

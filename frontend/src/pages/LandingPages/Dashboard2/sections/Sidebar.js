import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 style={{ marginTop: "4rem", justifyContent: "center" }}>TaskMe</h2>
      <ul>
        <li>
          <Link to="/dashboard2">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboardtask">Tasks</Link>
        </li>
        <li>
          <Link to="/completed">Completed</Link>
        </li>
        <li>
          <Link to="/inprogress">In Progress</Link>
        </li>
        <li>
          <Link to="/todo">To Do</Link>
        </li>
        <li>
          <Link to="/teamdashboard">Team</Link>
        </li>
        <li>
          <Link to="/trash">Trash</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

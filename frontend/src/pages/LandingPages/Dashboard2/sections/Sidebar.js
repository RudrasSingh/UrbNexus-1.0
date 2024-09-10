import React from "react";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>TaskMe</h2>
      <ul>
        <li>
          <a href="#">Dashboard</a>
        </li>
        <li>
          <a href="#">Tasks</a>
        </li>
        <li>
          <a href="#">Completed</a>
        </li>
        <li>
          <a href="#">In Progress</a>
        </li>
        <li>
          <a href="#">To Do</a>
        </li>
        <li>
          <a href="#">Team</a>
        </li>
        <li>
          <a href="#">Trash</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

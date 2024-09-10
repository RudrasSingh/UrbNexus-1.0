import React from "react";

function TaskList() {
  return (
    <div className="task-list">
      <h3>Task List</h3>
      <table>
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Priority</th>
            <th>Team</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Test Task</td>
            <td>High</td>
            <td>Team A</td>
            <td>7 months ago</td>
          </tr>
          {/* Add more rows */}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;

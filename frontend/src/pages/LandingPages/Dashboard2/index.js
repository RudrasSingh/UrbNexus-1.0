import React from "react";
import Sidebar from "./sections/Sidebar";
import Card from "./sections/Card";
import Chart from "./sections/Chart";
import TaskList from "./sections/TaskList";
import "./dashboard2.css"; // Add your CSS here

function Dashboard2() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="header">
          <h2>Dashboard</h2>
          <input type="text" placeholder="Search..." />
        </div>

        <div className="cards">
          <Card title="Total Task" number="10" subText="110 last month" icon="📄" />
          <Card title="Completed Task" number="1" subText="110 last month" icon="✅" />
          <Card title="Task In Progress" number="3" subText="110 last month" icon="🔄" />
          <Card title="Todos" number="6" subText="110 last month" icon="📋" />
        </div>

        <Chart />
        <TaskList />
      </div>
    </div>
  );
}

export default Dashboard2;

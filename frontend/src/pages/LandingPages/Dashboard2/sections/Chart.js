import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components from chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Chart() {
  // Data for the bar chart
  const data = {
    labels: ["High", "Medium", "Normal", "Low"], // Priority levels
    datasets: [
      {
        label: "Tasks by Priority",
        data: [10, 5, 8, 3], // Example data for each priority level
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Color for each bar
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Border color for each bar
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tasks by Priority",
      },
    },
  };

  return (
    <div className="chart">
      <h3>Chart by Priority</h3>
      {/* Render the Bar chart */}
      <Bar data={data} options={options} />
    </div>
  );
}

export default Chart;

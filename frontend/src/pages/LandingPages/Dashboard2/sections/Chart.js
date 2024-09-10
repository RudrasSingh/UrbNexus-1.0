import React from "react";

function Chart() {
  return (
    <div className="chart">
      <h3>Chart by Priority</h3>
      <div className="chart-box">
        {/* Placeholder for the chart */}
        <div className="bar">High</div>
        <div className="bar">Medium</div>
        <div className="bar">Normal</div>
        <div className="bar">Low</div>
      </div>
    </div>
  );
}

export default Chart;

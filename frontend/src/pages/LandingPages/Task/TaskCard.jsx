import React from "react";
import PropTypes from "prop-types";
import "./TaskCard.css"; // Import your CSS file for styling

const TaskCard = ({ ministry, taskTitle, dateAssigned, description, deadline }) => {
  return (
    <div className="task-card">
      <div className="card-header">
        <div className="ministry-name">
          <i className="fas fa-building"></i> {ministry}
        </div>
        <div className="task-title">{taskTitle}</div>
      </div>
      <div className="date-assigned">
        <i className="fas fa-calendar-alt"></i> {dateAssigned}
      </div>
      <div className="task-description">{description}</div>
      <div className="deadline">
        <i className="fas fa-clock"></i> Deadline: {deadline}
      </div>
      <div className="card-footer">
        <button className="ongoing-button">
          <i className="fas fa-play"></i> Ongoing
        </button>
        <div className="request-section">
          <span className="plus-icon">
            <i className="fas fa-plus"></i>
          </span>
          <span className="request-description">Request</span>
        </div>
      </div>
    </div>
  );
};

// Define prop-types
TaskCard.propTypes = {
  ministry: PropTypes.string.isRequired,
  taskTitle: PropTypes.string.isRequired,
  dateAssigned: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
};

export default TaskCard;

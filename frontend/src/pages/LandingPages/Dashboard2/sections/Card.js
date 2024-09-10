import React from "react";

// eslint-disable-next-line react/prop-types
function Card({ title, number, subText, icon }) {
  return (
    <div className="card">
      <div className="card-content">
        <h3>{title}</h3>
        <p>{number}</p>
        <span>{subText}</span>
      </div>
      <div className="icon">{icon}</div>
    </div>
  );
}

export default Card;

// TeamMembers.js
import React from "react";
import "./TeamMembers.css";

const TeamMembers = () => {
  const teamMembers = [
    {
      initials: "NU",
      name: "New User",
      title: "Designer",
      email: "user.email.com",
      role: "Developer",
      status: "Active",
    },
    {
      initials: "EW",
      name: "Emily Wilson",
      title: "Data Analyst",
      email: "user.email.com",
      role: "Analyst",
      status: "Active",
    },
    {
      initials: "AJ",
      name: "Alex Johnson",
      title: "UX Designer",
      email: "user.email.com",
      role: "Designer",
      status: "Active",
    },
    {
      initials: "JS",
      name: "Jane Smith",
      title: "Product Manager",
      email: "user.email.com",
      role: "Manager",
      status: "Active",
    },
    {
      initials: "CA",
      name: "Codewave Asante",
      title: "Administrator",
      email: "user.email.com",
      role: "Admin",
      status: "Active",
    },
  ];

  return (
    <div className="team-members-container">
      <h2>Team Members</h2>
      <button className="add-user-button">+ Add New User</button>
      <div className="team-members-table">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Title</th>
              <th>Email</th>
              <th>Role</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={index}>
                <td>
                  <div className="user-info">
                    <span className="user-initials">{member.initials}</span>
                    {member.name}
                  </div>
                </td>
                <td>{member.title}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>
                  <span className="status-badge">{member.status}</span>
                </td>
                <td>
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamMembers;

// TeamMembers.js
import React from "react";
import "./TeamMembers.css";
// import sidebarRoutes from "sidebar.routes";
import Sidebar from "../Sidebar";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../redux/action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";

const TeamMembers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserState = useSelector((state) => state.userData);
  const label = UserState == null ? "Sign In" : "Sign Out";

  const handleActionClick = () => {
    if (UserState == null) {
      navigate("/signin"); // Redirect to the SignIn page
    } else {
      dispatch(logoutUser());
      alert("Logged out successfully");
    }
  };
  const filterRoutes = (routes) => {
    return routes
      .filter(
        (route) =>
          route.name !== "Dashboard" &&
          route.name !== "Dept." &&
          route.name !== "Create Task" &&
          route.name !== "Add Inventory"
      )
      .map((route) => {
        // If a route has a `collapse` property, we need to filter it recursively
        if (route.collapse) {
          return {
            ...route,
            collapse: filterRoutes(route.collapse), // Recursively filter the collapse array
          };
        }
        return route;
      });
  };
  const filteredRoutes = UserState ? routes : filterRoutes(routes);
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
    <>
      <MKBox
        position="fixed"
        top="0.5rem"
        width="100%"
        display="flex"
        justifyContent="center"
        zIndex="200"
      >
        <DefaultNavbar
          routes={filteredRoutes}
          action={{
            type: "internal",
            label: label,
            color: "info",
            functions: handleActionClick, // Use the function directly
          }}
          sticky
        />
      </MKBox>
      <Sidebar></Sidebar>
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
      <MKBox pt={6} px={1} mt={6} mb={0}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default TeamMembers;

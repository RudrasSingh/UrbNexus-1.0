import React, { useEffect, useState } from "react";
import "./InventoryTasks.css";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import { inventories } from "./inventories"; // Update the path as needed
import { database } from "../DummyJson/login"; // Update the path as needed
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Inventory = () => {
  const [ministries, setMinistries] = useState([]);

  // Fetch ministries from JS file
  useEffect(() => {
    setMinistries(database.ministries);
  }, []);

  // Helper function to get department name by ministry_id
  const getDepartmentName = (ministry_id) => {
    const ministry = ministries.find((ministry) => ministry.id === ministry_id);
    return ministry ? ministry.name : "Unknown Department";
  };

  const handleRequestInventory = (itemName, department) => {
    alert(`Request for ${itemName} sent to ${department}!`);
  };

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

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
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

      <div className="inventory-container">
        <div className="header">
          <h1>Inventory List</h1>
        </div>
        <div className="task-table">
          <div className="table-head">
            <div>Item</div>
            <div>Quantitity</div>
            <div>Description</div>
            <div>Department</div>
            <div>Request</div>
          </div>
          {inventories.map((item, index) => {
            const departmentName = getDepartmentName(item.ministry_id);
            return (
              <div key={index} className="table-roww">
                <div className="item-name">{item.item_name}</div>
                <div className="item-quantity">{item.quantity}</div>
                <div className="item-description">{item.description}</div>
                <div className="item-department">{departmentName}</div>
                <div className="item-actions">
                  <button
                    className="request-btn"
                    onClick={() => handleRequestInventory(item.item_name, departmentName)}
                  >
                    Request Inventory
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MKBox pt={6} px={1} mt={6} mb={0}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default Inventory;

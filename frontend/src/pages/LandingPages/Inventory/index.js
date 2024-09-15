import React, { useEffect, useState } from "react";
import "./InventoryTasks.css";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import { inventories } from "./inventories"; // Update the path as needed
import { database } from "../DummyJson/login"; // Update the path as needed

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
          routes={routes}
          action={{
            type: "internal",
            label: "Sign Out",
            color: "info",
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

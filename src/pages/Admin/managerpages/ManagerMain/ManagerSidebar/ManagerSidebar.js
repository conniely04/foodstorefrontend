import React from "react";
import { Link } from "react-router-dom";
import "../ManagerSidebar/ManagerSidebar.css";

const ManagerSidebar = () => {
  return (
    <div className="managers-sidebar">
      <Link to="/ManagerMainPage/dashboard">Dashboard</Link>

      <Link to="/ManagerMainPage/product-management">Product Management</Link>
      <Link to="/ManagerMainPage/tracking">Order Tracking</Link>
    </div>
  );
};

export default ManagerSidebar;

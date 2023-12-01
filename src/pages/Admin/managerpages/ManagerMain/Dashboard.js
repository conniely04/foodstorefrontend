import React from "react";
import "../../ManagerStyling/Dashboard.css";
import ManagerSidebar from "./ManagerSidebar/ManagerSidebar";

const Dashboard = () => {
  const metrics = {
    totalSales: 120000,
    totalOrders: 350,
    lowStockItems: 15,
  };

  return (
    <div className="dashboard">
      <ManagerSidebar />
      <h1>Manager Dashboard</h1>
      <div className="metrics">
        <div className="metric-box">
          <h2>Total Sales</h2>
          <p>${metrics.totalSales}</p>
        </div>
        <div className="metric-box">
          <h2>Total Orders</h2>
          <p>{metrics.totalOrders}</p>
        </div>
        <div className="metric-box">
          <h2>Low Stock Items</h2>
          <p>{metrics.lowStockItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import ManagerCategories from "../../../ManagerComponents/ManagerCategories/ManagerCategories";
import ManagerSidebar from "../ManagerSidebar/ManagerSidebar";
import "../ManagerProduct/ManagerProduct.css";

function ProductManagement() {
  return (
    <div className="product-management">
      <ManagerSidebar />
      <h1>Product Management</h1>
      <div className="ManagerCategories">
        <h2>Categories</h2>
        <ManagerCategories />
      </div>
      <div className="ending-line"></div>
    </div>
  );
}

export default ProductManagement;

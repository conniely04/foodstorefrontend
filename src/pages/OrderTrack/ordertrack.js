import React, { useState, useEffect } from "react";
import "../OrderTrack/ordertrack.css";
import { useAuth } from "../../hooks/useauth";

import { toast } from "react-toastify";
function Tracking() {
  const backgroundImageUrl = "/thumbnail/map.png"; // Make sure this URL points to your actual map image
  const [progress, setProgress] = useState(0);
  const { orders, loading, error } = useAuth();

  if (loading) {
    toast.error("Loading Orders");
  }
  if (error) {
    toast.error("ERRORRRR LOL");
  }
  useEffect(() => {
    if (loading) {
      toast.info("Loading Orders");
    }
    if (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [loading, error]); // Adding dependencies to useEffect

  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };

  const stages = [
    "Order Accepted",
    "Preparing Order",
    "On the Way",
    "Delivered",
  ];

  return (
    <div className="background-container" style={containerStyle}>
      <h1 className="thank-you-text">Thank You!</h1>
      <div className="delivery-progress">
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`stage ${index <= progress ? "completed" : ""}`}
            onClick={() => setProgress(index)}
          >
            <div
              className={`circle ${
                index <= progress ? "circle-completed" : ""
              }`}
            >
              {index < progress ? <span className="checkmark">✔</span> : null}
            </div>
            <p>{stage}</p>
          </div>
        ))}
      </div>{" "}
      <div>
        <h3 className="thank-you-text">Order Details</h3>
        <div>
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order.id}>
                  <h3>Order ID: {order.id}</h3>
                  <p>Customer Name: {order.name}</p>
                  <p>Address: {order.address}</p>
                  <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tracking;

import React, { useState, useEffect } from "react";
import "../OrderTrack/ordertrack.css";
import { useAuth } from "../../hooks/useauth";

function Tracking() {
  const backgroundImageUrl = "/images/map.png";
  const [progress, setProgress] = useState(0);
  const { orders, fetchorders } = useAuth();

  useEffect(() => {
    fetchorders();
  }, [fetchorders]);

  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };

  const stages = [
    "Order Accepted",
    "Preparing Order",
    "Order Shipped",
    "On the Way",
    "Delivered",
  ];

  return (
    <div className="background-container" style={containerStyle}>
      <div>
        <h1 className="thank-you-text">Thank you</h1>
      </div>
      <div>
        <h1>Your Orders</h1>
        {orders.map((order) => (
          <div key={order._id}>
            {/* Display order details */}
            <p>Order ID: {order._id}</p>
          </div>
        ))}
      </div>
      {/* <div className="delivery-progress">
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`stage ${index === progress ? "completed" : ""}`}
            onClick={() => setProgress(index)}
          >
            {index < progress ? (
              <span>✔</span>
            ) : (
              <input type="checkbox" checked={index === progress} readOnly />
            )}
            <p>{stage}</p>

            <button>Show Orders</button>
            
          </div>
          
        ))}
      </div> */}
    </div>
  );
}

export default Tracking;

import React, { useState, useEffect } from "react";
import "../OrderTrack/ordertrack.css";
import { useAuth } from "../../hooks/useauth";

import { toast } from "react-toastify";
function Tracking() {
  const backgroundImageUrl = "/thumbnail/map.png"; // Make sure this URL points to your actual map image
  const [progress, setProgress] = useState(0);

  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };

  const { mostRecentOrder, userOrders } = useAuth();

  useEffect(() => {
    userOrders(); // Fetch orders when the component mounts
  }, [userOrders]);

  const stages = [
    "Order Accepted",
    "Preparing Order",
    "On the Way",
    "Delivered",
  ];

  // <div className="order-details-container">
  //       {loading && <p>Loading orders...</p>}
  //       {error && <p>Error fetching orders: {error.message}</p>}
  //       {!loading && !error && orders.length === 0 && (
  //         <p>No orders to display.</p>
  //       )}
  //       {!loading && !error && orders.length > 0 && (
  //         <ul>
  //           {orders.map((order) => (
  //             <li key={order._id}>
  //               {" "}
  //               {/* Make sure to use the correct identifier property */}
  //               <h3>Order ID: {order._id}</h3>
  //               <p>Customer Name: {order.customerName}</p>
  //               <p>Address: {order.shippingAddress}</p>
  //               <p>Total Price: ${order.totalAmount}</p>
  //               {/* Add more order details as needed */}
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //     </div>
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
        {mostRecentOrder && (
          <div className="order-details">
            {/* Display the details of the most recent order */}

            <p>
              <strong>Order ID:</strong> {mostRecentOrder.id}
            </p>
            <p>
              <strong>Name:</strong> {mostRecentOrder.name}
            </p>
            <p>
              <strong>Address:</strong> {mostRecentOrder.address}
            </p>
            <p>
              <strong>Delivery Time:</strong>{" "}
              {new Date(
                new Date(mostRecentOrder.createdAt).getTime() + 60 * 60 * 1000
              ).toLocaleString()}
            </p>
            <p>
              <strong>Total Price:</strong> $
              {mostRecentOrder.totalPrice.toFixed(2)}
            </p>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tracking;

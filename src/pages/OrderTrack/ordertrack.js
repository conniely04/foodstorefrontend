import React, { useState } from "react";
import "../OrderTrack/ordertrack.css";

function Tracking() {
  const backgroundImageUrl = "/images/map.png";
  const [progress, setProgress] = useState(0);

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
      <div className="delivery-progress">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tracking;

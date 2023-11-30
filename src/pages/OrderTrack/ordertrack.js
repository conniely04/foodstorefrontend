import React, { useState } from "react";
import "../OrderTrack/ordertrack.css";

function Tracking() {
  const backgroundImageUrl = "/thumbnail/map.png"; // Make sure this URL points to your actual map image
  const [progress, setProgress] = useState(0);

  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    // Add additional styles as needed
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
            <div className={`circle ${index <= progress ? "circle-completed" : ""}`}>
              {index < progress ? <span className="checkmark">✔</span> : null}
            </div>
            <p>{stage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tracking;

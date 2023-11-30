import React from "react";
import { Link } from "react-router-dom";
import "../footer/footer.css";

const Footer = () => {
  return (
    <div className="container">
      <div className="footer-sections">
        <div className="footer-section">
          <p className="title">HOURS</p>
          <p className="text">We are Open 24 hours</p>
        </div>
        <div className="footer-section">
          <p className="title">ABOUT US</p>

          <p className="text">Learn more about our Story!</p>
        </div>
        <div className="footer-section">
          <p className="title">LET'S GET SOCIAL !</p>

          <div className="social-icons">
            <img
              src="/socialmedia/instagram.png"
              alt="Instagram"
              className="social-icon"
            />
            <img
              src="/socialmedia/twitter.png"
              alt="Facebook"
              className="social-icon"
            />
            <img
              src="/socialmedia/facebook.png"
              alt="Twitter"
              className="social-icon"
            />
          </div>
        </div>
      </div>
      {/* <div className="footer">
        <p>Copyright © 2023 Online Food Store. All rights reserved.</p>
      </div> */}
    </div>
  );
};

export default Footer;

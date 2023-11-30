import { Link, Navigate, useMatch, useResolvedPath } from "react-router-dom";
import { useState } from "react";
import "../navbar/navbar.css";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useauth.js";
import SearchBar from "../Search/search";

//add when u click on somewhere else menu closes
const Navbar = () => {
  const { cart } = useAuth();
  const totalQuantity = cart.foodList.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);

  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    logout();
  };

  <html>
    <head>
      <link
        href="https://fonts.googleapis.com/css?family=Cabin"
        rel="stylesheet"
      ></link>
    </head>
  </html>;

  return (
    <div className="wholenavbar">
      <nav className="navbar">
        <CustomLink className="headers" to="/">
          <img src="/thumbnail/logo5.png" alt="Home Page" className="logo" />
        </CustomLink>
        <Link to="/" className="store-name">
          Online Food Store
        </Link>
        <div className="search-bar">
          <SearchBar />
          {/*add searchbar component here*/}
        </div>
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <div className="sidebar-content">
            <p className="side-bar-name">Menu</p>
            <div className="cont">
              <CustomLink className="contentin" to="/">
                Home
              </CustomLink>
              {user ? (
                <>
                  <div className="logout-container">
                    <CustomLink
                      href="#"
                      onClick={handleLogout}
                      className="contentin logout"
                      to="/"
                    >
                      Logout
                    </CustomLink>
                  </div>
                </>
              ) : (
                <CustomLink className="contentin" to="/login">
                  Login
                </CustomLink>
              )}

              <CustomLink className="contentin" to="/About">
                About
              </CustomLink>
              <CustomLink className="contentin" to="/Contact">
                Contact
              </CustomLink>
              {user && (
                <CustomLink className="contentin" to="/ordertracking">
                  Orders
                </CustomLink>
              )}
            </div>
          </div>
        </div>

        <ul className="navigation-links">
          <div className="sidebar-toggle" onClick={toggleMenu}>
            <div className="hamicon">&#8801; </div>
            {/* Unicode hamburger icon */}
          </div>
          <div className="loginbutton">
            {user ? (
              <CustomLink className="headers" to="/profile">
                {user.firstname}
              </CustomLink>
            ) : (
              <CustomLink className="headers" to="/login">
                Login
              </CustomLink>
            )}
          </div>

          {user && (
            <div>
              <li className="shopping-cart">
                <CustomLink className="headers" to="/ShoppingCart">
                  <img
                    src="/thumbnail/cart.png"
                    alt="Shopping Cart"
                    className="shopping-cart-icon"
                  />
                </CustomLink>
              </li>
            </div>
          )}
          {user && <divc className="quantamt">({totalQuantity} Items)</divc>}
        </ul>
      </nav>
    </div>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? " active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;

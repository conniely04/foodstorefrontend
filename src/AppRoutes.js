import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useauth.js";
import LoginPage from "./pages/Login/Login";
import Browsing from "./pages/Home/Browsing";
import Register from "./pages/Register/register";
import SearchResults from "./pages/Searchresult/searchresult";
import About from "./pages/Extra/About";
import Contact from "./pages/Extra/Contact";
import ManagerRegister from "./pages/Admin/managerpages/ManRegister/ManagerRegister";
import ManagerLogin from "./pages/Admin/managerpages/ManagerMain/ManagerLogin/ManagerLogin";
import Dashboard from "./pages/Admin/managerpages/ManagerMain/Dashboard.js";
import ProductManagement from "./pages/Admin/managerpages/ManagerMain/ManagerProduct/ManagerProduct.js";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart.js";
import Checkout from "./pages/Checkout/checkout.js";
import Tracking from "./pages/OrderTrack/ordertrack.js";

import OrderTracking from "./pages/Admin/managerpages/ManagerMain/Tracking/OrderTracking.js";

export default function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();
  const ProtectedRoute = ({ children }) => {
    return user && user.isAdmin ? (
      children
    ) : (
      // Redirect non-manager users to a different route (e.g., customer login)
      <Navigate to="/managerlogin" replace state={{ from: location }} />
    );
  };

  const ProtectedRouteCart = ({ children }) => {
    const { user } = useAuth(); // Get the user from your auth context or state
    const location = useLocation(); // Get the current location

    return user ? (
      children
    ) : (
      // Redirect non-manager users to a different route (e.g., customer login)
      <Navigate to="/login" replace state={{ from: location }} />
    );
  };
  return (
    <Routes>
      {/* change this later on back to route to /login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Browsing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/shoppingcart"
        element={ProtectedRouteCart({ children: <ShoppingCart /> })}
      ></Route>
      <Route
        path="/checkout"
        element={ProtectedRouteCart({ children: <Checkout /> })}
      ></Route>
      <Route
        path="/ordertracking"
        element={ProtectedRouteCart({ children: <Tracking /> })}
      ></Route>
      <Route path="/ordertracking" element={<Tracking />} />
      <Route
        path="/ManagerMainPage/managerregister"
        element={<ManagerRegister />}
      />
      <Route path="/ManagerMainPage/managerlogin" element={<ManagerLogin />} />
      <Route
        path="/ManagerMainPage/dashboard"
        element={ProtectedRoute({ children: <Dashboard /> })}
      />
      <Route
        path="/ManagerMainPage/product-management"
        element={ProtectedRoute({ children: <ProductManagement /> })}
      />
     <Route
        path = "/ManagerMainPage/tracking"
        element = {ProtectedRoute({children: <OrderTracking />})} />
    </Routes>
  );
}

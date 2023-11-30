//FRONTEND USER FUNCTIONS
import { useState, createContext, useContext, useEffect } from "react";
import * as userService from "../services/userService.js";
import { toast } from "react-toastify";
import { resolvePath, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const cart = userService.getCart();
  //line 11?
  const [user, setUser] = useState(userService.getUser());
  const [responseData, setResponseData] = useState(userService.getUser()); // Initialize with default user data

  const [authState, setAuthState] = useState({
    user: userService.getUser() || {},
    cart: userService.getCart() || {}, // Assuming you have a method to get the cart from local storage
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Ideally, you would have a method to validate the current token
      const isLoggedIn = await userService.isUserLoggedIn();
      if (!isLoggedIn && authState.user) {
        toast.info("Session expired. Please log in again.");
        userService.logout();
        setAuthState({ user: null, cart: null });
        // If the validation fails, clear the user state
        setUser(null);
        setResponseData(null);
      }
    };

    if (authState.user) {
      checkAuthStatus();
    }
  }, [authState.user, authState.cart]);

  const addCartItem = async (itemId, quantity, price) => {
    try {
      const updatedCart = await userService.addToCart(itemId, quantity, price);
      setAuthState((prevAuthState) => ({
        ...prevAuthState,
        cart: updatedCart,
      }));
    } catch (error) {
      toast.info("Error adding item!");
      console.error("Error adding to cart:", error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  const removeCartItem = async (foodId, quantity) => {
    console.log("Food Id from useauth.js: ", foodId);
    try {
      // Call the removeFromCart function from userService
      const updatedCart = await userService.removeFromCart(foodId, quantity);
      setAuthState((prevAuthState) => ({
        ...prevAuthState,
        cart: updatedCart,
      }));
      console.log("UPDATED CART AFTER REMOVAL: ", updatedCart);
      toast.info("Removed item from cart!");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  const login = async (email, password) => {
    try {
      const responsedata = await userService.login(email, password);
      //this function works navbar and returning cart
      setUser(responsedata.user);
      setResponseData(responsedata);
      console.log("This is returned data:", responsedata);
      if (
        responsedata &&
        responsedata.user &&
        responsedata.user.isAdmin === true
      ) {
        setAuthState({ user: responsedata.user, cart: responsedata.cart });
        toast.success("Logged in as Admin!");
        navigate("/ManagerMainPage/dashboard");
      } else {
        toast.success("Logged in as Customer!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const register = async (data) => {
    try {
      const responsedata = await userService.register(data);
      setAuthState({ user: responsedata.user, cart: responsedata.cart });
      setUser(responsedata.user);
      setResponseData(responsedata);

      if (responsedata.user.isAdmin === true) {
        toast.success("Registered as Admin!");
        navigate("/ManagerMainPage/dashboard");
      } else {
        toast.success("Registered as Customer!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
    setAuthState({ user: null, cart: null });
    toast.success("Logout Successful");
  };

  //ORDER CODE
  const createOrder = async (orderDetails) => {
    console.log("ORDER DATA FROM AUTH.JS:", orderDetails);
    console.log("USER", user.id);

    try {
      // Ensure that there is a logged-in user
      if (!authState.user) {
        toast.info("No user. Please Log In!");
      }
      if (!authState.user) {
        throw new Error("No user logged in");
      }
      // Add the user's ID to the order data
      const orderData = {
        ...orderDetails,
        user: user.id, // Assuming that the user object has an _id field
      };
      console.log("ORDER DATA:", orderData);
      toast.success("Order Succesfully Placed!");
      userService.placeOrder(orderData);
      // ... rest of your code ...
    } catch (error) {
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  return (
    <AuthContext.Provider
      value={{
        cart,
        ...authState,
        createOrder,
        addCartItem,
        removeCartItem,
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

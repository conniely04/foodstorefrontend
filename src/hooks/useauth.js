import { useState, createContext, useContext, useEffect } from "react";
import * as userService from "../services/userService.js";
import { toast } from "react-toastify";




const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const cart = userService.getCart();
  const [authState, setAuthState] = useState({
    user: userService.getUser() || {},
    cart: userService.getCart() || {} // Assuming you have a method to get the cart from local storage
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      const isLoggedIn = await userService.isUserLoggedIn();
      if (!isLoggedIn && authState.user) {
        toast.info("Session expired. Please log in again.");
        userService.logout();
        setAuthState({ user: null, cart: null });
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
      console.error('Error adding to cart:', error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  const removeCartItem = async (foodId) => {
    try {
      // Call the removeFromCart function from userService
      const updatedCart = await userService.removeFromCart(foodId);
      setAuthState((prevAuthState) => ({
        ...prevAuthState,
        cart: updatedCart,
      }));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  const login = async (email, password) => {
    try {
      const responseData = await userService.login(email, password);
      if (responseData && responseData.user) {
        setAuthState({ user: responseData.user, cart: responseData.cart });
        // navigate to home or dashboard page if needed
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  

  const register = async (data) => {
    try {
      const responseData = await userService.register(data);
      setAuthState({ user: responseData.user, cart: responseData.cart });
      toast.success("Register Successful!");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const logout = () => {
    userService.logout();
    setAuthState({ user: null, cart: null });
    toast.success("Logout Successful");
  };

  return (
    <AuthContext.Provider value={{cart,...authState, login, logout, register, addCartItem, removeCartItem }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

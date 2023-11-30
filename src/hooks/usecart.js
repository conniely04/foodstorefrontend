import { useState } from "react";
import { initialCartState } from "../components/InitialCart/initialcart";
import axios from "axios";
import { getUser } from "../services/userService";

export const useCart = () => {
  const [cart, setCart] = useState(initialCartState);

  const clearCart = async () => {
    try {
      // Optionally, clear the cart on the backend first
      const user = getUser(); // Function to get the current user's details, including the token
      const token = user.token;

      await axios.post(
        "http://localhost:5001/api/users/clearcart",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Clear the cart in the frontend
      setCart(initialCartState);

      // Additionally, clear the cart in local storage if you're using it
      localStorage.setItem("cart", JSON.stringify(initialCartState));
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };

  const updateCartOnServer = async (updatedCart) => {
    try {
      // Send the updated cart to the server
      // ...
    } catch (error) {
      console.error("Error updating cart on server:", error);
      throw error;
    }
  };

  // Add more cart manipulation functions as needed

  return { cart, setCart, clearCart, updateCartOnServer };
};

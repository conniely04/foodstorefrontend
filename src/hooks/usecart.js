import { useState } from "react";
import { initialCartState } from "../components/InitialCart/initialcart";
import axios from "axios";
import { getUser } from "../services/userService";

export const useCart = () => {
  const [cart, setCart] = useState(initialCartState);

  const clearCart = async () => {
    try {
      const user = getUser();
      const token = user.token;

      await axios.post(
        "http://localhost:5001/api/users/clearcart",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(initialCartState);

      localStorage.setItem("cart", JSON.stringify(initialCartState));
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };

  const updateCartOnServer = async (updatedCart) => {
    try {
    } catch (error) {
      console.error("Error updating cart on server:", error);
      throw error;
    }
  };

  return { cart, setCart, clearCart, updateCartOnServer };
};

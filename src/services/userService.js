//GETTING THE DATA FROM THE BACKEND
//communication of frontend and back end
import axios from "axios";

//getting user data
export const getUser = () => {
  const userJson = localStorage.getItem("user");
  if (!userJson) {
    return null;
  }
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    localStorage.removeItem("user");
    return null;
  }
};

export const login = async (email, password) => {
  const { data } = await axios.post("http://localhost:5001/api/users/login", {
    email,
    password,
  });
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
    console.log("Login response data:", data);
  }
  if (data.cart) {
    localStorage.setItem("cart", JSON.stringify(data.cart));
  }

  return data;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.setItem("cart", JSON.stringify({ foodList: [], totalPrice: 0 }));
  console.log("LOGOUT LOCALSTROAGE:", localStorage);
};

export const register = async (registerData) => {
  const { data } = await axios.post(
    "http://localhost:5001/api/users/register",
    registerData
  );
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  if (data.cart) {
    localStorage.setItem("cart", JSON.stringify(data.cart));
  }
  return data;
};

export const isUserLoggedIn = async () => {
  const user = getUser();
  if (!user || !user.token) {
    return false;
  }
  try {
    const response = await axios.get(
      "http://localhost:5001/api/users/validateToken",
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response.data.isValid;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

//cart functions
export const getCart = () => {
  const cart = localStorage.getItem("cart");

  return cart ? JSON.parse(cart) : null;
};

export const addToCart = async (itemId, quantity, price) => {
  const user = getUser();

  //working code
  console.log("Item successfully added");
  const response = await axios.post(
    "http://localhost:5001/api/users/addToCart",
    {
      foodId: itemId,
      quantity,
      price,
    },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  // Update local storage with the new cart data
  const updatedCart = response.data;
  user.cart = updatedCart;
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  console.log("UPDATED ADD CART:", updatedCart);

  return updatedCart;
};

export const removeFromCart = async (foodId, quantity) => {
  const url = `http://localhost:5001/api/users/removeitem/${foodId}/${quantity}`;

  const user = getUser();
  const response = await axios.delete(
    url,

    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  // Update local storage with the new cart data after removal
  const updatedCart = response.data.cart;
  const dat = response.data.cart.foodList;
  console.log("Food List: ", dat);
  user.cart = updatedCart;
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  console.log("DELETED ITEM CART: ", updatedCart);

  return updatedCart; // Return the updated cart data
};

export const placeOrder = async (orderData) => {
  const user = getUser();
  console.log("USERSERVICE DATA:", orderData);

  try {
    const { data } = await axios.post(
      "http://localhost:5001/api/users/createorder",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (data.order) {
      console.log("Order response data:", data);
    }
    console.log("NEW ORDER DATA:", data);
    return data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

//test code

export const clearCart = async () => {
  try {
    const currentCart = JSON.parse(localStorage.getItem("cart"));

    if (currentCart && currentCart.foodList) {
      for (const item of currentCart.foodList) {
        await removeFromCart(item.food._id, item.quantity);
      }

      const newCart = {
        ...currentCart,
        foodList: [],
        totalPrice: 0,
      };

      localStorage.setItem("cart", JSON.stringify(newCart));
      console.log("Cart reset to new empty state", newCart);
    }

    return true;
  } catch (error) {
    console.error("Error resetting cart:", error);
    throw error;
  }
};

export const getOrders = async () => {
  const user = getUser();

  if (!user || !user.token) {
    console.error("User is not logged in or token is missing");
    return null;
  }

  try {
    const response = await axios.get("http://localhost:5001/api/users/orders", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

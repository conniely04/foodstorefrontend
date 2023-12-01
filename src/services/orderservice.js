import axios from "axios";
import { getUser } from "../services/userService";

export const createOrder = async (order) => {
  const user = getUser();
  if (!user || !user.token) {
    throw new Error("User is not authenticated");
  }

  try {
    const { data } = await axios.post(
      "http://localhost:5001/api/orders/create",
      order,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrders = async () => {
  const user = getUser();
  if (!user || !user.token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await fetch("http://localhost:5001/api/orders/", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

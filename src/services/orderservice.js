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
    throw error; // Or handle the error as you see fit
  }
};

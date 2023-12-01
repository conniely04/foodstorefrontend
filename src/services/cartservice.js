import axios from "axios";

const BASE_URL = "http://localhost:5001";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const addToCart = async (userId, productId, quantity) => {
  return axios.post(`http://localhost:5001/api/cart/add`, {
    userId,
    productId,
    quantity,
  });
};

export const removeFromCart = async (userId, itemId) => {
  return axios.delete(
    `http://localhost:5001/api/cart/remove/${userId}/${itemId}`
  );
};

export const updateCart = async (userId, items) => {
  return axios.put(`http://localhost:5001/api/cart/update`, { userId, items });
};

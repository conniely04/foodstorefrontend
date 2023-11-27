import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Adjust the URL as per your server configuration

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

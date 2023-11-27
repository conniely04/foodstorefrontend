import axios from "axios";

//food apis
 export const getAll = async () => {
  const { data } = await axios.get("/api/foods");
  return data;
};

export const getfoodCategory = async (category) => {
  try {
    const { data } = await axios.get("/api/foods/category/" + category);
    return data;
  } catch (error) {
    console.log("error fetching food for category ${category}:", error);
    return null;
  }
};

export const getFoodById = async (foodId) => {
  try {
    const { data } = await axios.get(`/api/foods/${foodId}`);
    return data;
  } catch (error) {
    console.log(`Error fetching food by ID ${foodId}:`, error);
    throw error; // Re-throw the error to handle it in the component
  }
};

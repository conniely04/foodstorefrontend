import axios from "axios";

//food apis
export const getAll = async () => {
  const { data } = await axios.get("/api/foods");
  return data;
};

export const getfoodCategory = async (categoryId) => {
  try {
    const { data } = await axios.get("/api/foods/category/" + categoryId);
    return data;
  } catch (error) {
    console.log(`error fetching food for category ${categoryId}:`, error);
    return null;
  }
};

export const search = async (searchFood) => {
  try {
    const { data } = await axios.get(
      "/api/foods/search/" + encodeURIComponent(searchFood)
    );
    return data;
  } catch (error) {
    console.error("Error during search:", error);
    throw error;
  }
};

//for manager side?
export const addNewItem = async (newItem) => {
  try {
    const { data } = await axios.post("/api/foods", newItem);
    return data;
  } catch (error) {
    console.error("Error adding new item:", error);
    throw error;
  }
};

//for customer cart side
export const getFoodById = async (foodId) => {
  try {
    const { data } = await axios.get(`/api/foods/${foodId}`);
    return data;
  } catch (error) {
    console.log(`Error fetching food by ID ${foodId}:`, error);
    throw error;
  }
};

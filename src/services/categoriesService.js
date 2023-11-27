import axios from 'axios';

// Categories APIs
export const getAll = async () => {
    const { data } = await axios.get("/api/categories");
    return data;
};

export const getCategories = async () => {
  try {
    const { data } = await axios.get("/api/categories/");
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};

export const addCategory = async (formData) => {
  try {
      const response = await axios.post("/api/categories/", formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error adding category:', error);
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
      const response = await axios.put(`/api/categories/${id}`, categoryData);
      return response.data;
  } catch (error) {
      console.error('Error updating category:', error);
  }
};

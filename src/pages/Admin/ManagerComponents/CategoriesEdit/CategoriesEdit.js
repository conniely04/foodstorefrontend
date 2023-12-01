import React, { useState, useEffect } from "react";
import {
  addCategory,
  updateCategory,
} from "../../../../services/categoriesService";
import "./CategoriesEdit.css";

function CategoriesEdit({ category, onSave, onClose }) {
  const [categoryData, setCategoryData] = useState({ name: "", image: "" });

  useEffect(() => {
    if (category) {
      setCategoryData(category);
    }
  }, [category]);

  const handleFileChange = (event) => {
    setCategoryData({ ...categoryData, image: event.target.files[0] });
  };

  const handleChange = (event) => {
    setCategoryData({
      ...categoryData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", categoryData.name);
    if (categoryData.image) {
      formData.append("image", categoryData.image);
    }

    let savedCategory;
    if (categoryData._id) {
      // Update existing category
      savedCategory = await updateCategory(categoryData._id, formData);
    } else {
      // Add new category
      savedCategory = await addCategory(formData);
    }
    onSave(savedCategory);
  };

  return (
    <div className="categories-edit-modal">
      <div className="categories-edit-form">
        <form onSubmit={handleSave}>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            value={categoryData.name}
            onChange={handleChange}
          />
          <input type="file" onChange={handleFileChange} />

          <div className="form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoriesEdit;

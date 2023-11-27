import React, { useState, useEffect } from "react"; // Import useEffect here
import "../../../../components/categories/categories.css";
import Product from "../Product/Product";
import CategoriesEdit from './../CategoriesEdit/CategoriesEdit';
import './ManagerCategories.css';
import { getCategories, addCategory, updateCategory } from '../../../../services/categoriesService';

import './ManagerCategories.css';


function ManagerCategories({}) {
    const [editCategory, setEditCategory] = useState(null);
    const [categoriesData, setCategoriesData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [scrollIndex, setScrollIndex] = useState(0);
    const maxVisibleCategories = 5;
  
    useEffect(() => {
      const fetchCategories = async () => {
        const categories = await getCategories();
        setCategoriesData(categories);
        if (categories.length > 0) {
          setSelectedCategory(categories[0]._id); // Use _id instead of name
        }
      };
      fetchCategories();
    }, []);

  const scrollLeft = () => {
      if (scrollIndex > 0) {
          setScrollIndex(scrollIndex - 1);
      }
  };

  const scrollRight = () => {
      if (scrollIndex + maxVisibleCategories < categoriesData.length) {
          setScrollIndex(scrollIndex + 1);
      }
  };

  const handleAddCategory = () => {
    setEditCategory({ name: '', image: '', _id: null });
    console.log("Add Category Clicked"); // Check if this gets logged
};
 // Adjustments to handleEditCategory and handleAddCategory
 const handleEditCategory = (category, event) => {
    event.stopPropagation(); // Prevents the category click event
    setEditCategory({ ...category });
};

const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
};

  const handleSaveCategory = async (category) => {
    if (category && category._id) {
      // Existing category
      await updateCategory(category._id, category);
    } else {
      // New category
      await addCategory(category);
    }
    // Fetch the updated categories list
    const updatedCategories = await getCategories();
    setCategoriesData(updatedCategories);
    setEditCategory(null);
  };

  return (
      <div className="categories-list-container">
          <div className="category-list">
              <div className="scroll-arrow left-arrow" onClick={scrollLeft}>
                  <img src="/thumbnail/arrow-left.png" alt="Left Arrow" />
              </div>
              <div className="category-box add-category" onClick={handleAddCategory}>
                  <button className="add-category-button">Add Category</button>
              </div>
              {categoriesData
                .slice(scrollIndex, scrollIndex + maxVisibleCategories)
                .map(category => (
                    <div key={category._id} className="category-box" 
                    onClick={() => handleCategoryClick(category._id)}>
                          <img src={`/thumbnail/${category.image}`} alt={category.name} className="category-image" />
                          <p className="category-name">{category.name}</p>
                          <div className="category-button-container">
                              <button className="category-button" onClick={(e) => handleEditCategory(category, e)}>Edit</button>
                              <button className="category-button" onClick={(e) => {
                                  e.stopPropagation(); // Logic to remove category
                              }}>Remove</button>
                          </div>
                      </div>
                  ))}
              <div className="scroll-arrow right-arrow" onClick={scrollRight}>
                  <img src="/thumbnail/arrow-right.png" alt="Right Arrow" />
              </div>
          </div>
          <div className="category-line"></div> {/* Add this line to separate the category section from category items */}
          <div className="category-item-container">
             <Product selectedCategory={selectedCategory} />
          </div>
          {/* Conditional rendering of CategoriesEdit */}
          {editCategory !== null && (
                <CategoriesEdit 
                    category={editCategory}
                    onSave={handleSaveCategory}
                    onClose={() => setEditCategory(null)}
                /> )}
      </div>
  );
}

export default ManagerCategories;
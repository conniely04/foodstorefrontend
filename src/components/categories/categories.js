import React, { useState, useEffect } from "react";
import "../categories/categories.css";
import CategoryItem from "../categoryitems/categoryitem";
import { getCategories } from "../../services/categoriesService"; // Import getCategories

function Categories({}) {
  const [categoriesData, setCategoriesData] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [scrollIndex, setScrollIndex] = useState(0);
  const maxVisibleCategories = 6;

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategoriesData(categories);
      if (categories.length > 0) {
        setSelectedCategory(categories[0]._id);
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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="categories-list-container">
      <div className="category-list">
        <div className="scroll-arrow left-arrow" onClick={scrollLeft}>
          <img src="thumbnail/arrow-left.png" alt="Left Arrow" />
        </div>
        {categoriesData
          .slice(scrollIndex, scrollIndex + maxVisibleCategories)
          .map((category, index) => (
            <div
              key={index}
              className={`category-box ${
                selectedCategory === category._id ? "selected" : ""
              }`}
              onClick={() => handleCategoryClick(category._id)}
            >
              {/* Update image path as per your server setup */}
              <img
                src={`/thumbnail/${category.image}`}
                alt={category.name}
                className="category-image"
              />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        <div className="scroll-arrow right-arrow" onClick={scrollRight}>
          <img src="thumbnail/arrow-right.png" alt="Right Arrow" />
        </div>
      </div>
      <div className="category-line"></div>
      <div className="category-item-container">
        <CategoryItem
          selectedCategory={selectedCategory}
          cart={cart}
          setCart={setCart}
        />
      </div>
    </div>
  );
}

export default Categories;

import React, { useState, useEffect } from "react";
import { getfoodCategory, addNewItem } from "../../../../services/foodservices";
import "../../../../components/categoryitems/categoryitem.css";
import './Product.css'; 
import ProductEdit from '../../ManagerComponents/ProductEdit/ProductEdit';

const Product = ({ selectedCategory }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (selectedCategory) {
        const products = await getfoodCategory(selectedCategory);
        setItems(products || []);
      }
    };
  
    fetchItems();
  }, [selectedCategory]);
  

  const handleEditItem = (item) => {
    setSelectedItem(item);
  };

  const handleRemoveItem = async (itemId) => {
    // Logic to handle item removal
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleSaveItem = async (item) => {
    if (item.id) {
      // Logic to update an existing item
      setItems(items.map(it => it.id === item.id ? item : it));
    } else {
      // Logic to add a new item
      const newItem = await addNewItem(item);
      setItems([...items, newItem]);
    }
    setSelectedItem(null);
  };

  const handleAddNewItem = () => {
    setSelectedItem({ name: '', price: '', image: '', category: selectedCategory, inStock: true });
  };

  return (
    <div className="product-container">
      <h2 className="product-heading">Products</h2>
      <div className="category-items">
        {/* Add New Item Box */}
        <div className="item-box" onClick={handleAddNewItem}>
          <div className="add-new-item-content">
            <button className="add-item-button">Add New Item</button>
          </div>
            </div>
            {items.map(item => (
              <div key={item.id} className="item-box">
                <div
                  className="item-image"
                  style={{ backgroundImage: `url('/food/${item.image}')` }}
                ></div>
                <p className="item-name">{item.name}</p>
                <p className="item-price">${item.price}</p>
                <div className="item-actions">
                  <button onClick={() => handleEditItem(item)}>Edit</button>
                  <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
            {selectedItem && (
              <ProductEdit
                product={selectedItem}
                onSave={handleSaveItem}
                onClose={() => setSelectedItem(null)}
              />
            )}
          </div>
        </div>
      );
    };

export default Product;
   
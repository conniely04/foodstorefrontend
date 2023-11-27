import React, { useState, useEffect } from "react";
import { getfoodCategory } from "../../services/foodservices.js";
import "../categoryitems/categoryitem.css";
import ItemDetail from "../itemdetail/itemdetail.js";

const CategoryItem = ({ selectedCategory, cart, setCart }) => {
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

    // Calculate the total item count in the cart
    const itemCount = cart.reduce((total, item) => total + item.count, 0);
    // Update the shopping cart icon
    const cartIconElement = document.getElementById("shopping-cart-icon");
    if (cartIconElement) {
      cartIconElement.textContent = itemCount;
    }
  }, [selectedCategory, cart]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const addToCart = (item, event) => {
    event.stopPropagation();
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      existingItem.count += 1;
    } else {
      updatedCart.push({ ...item, count: 1 });
    }
    setCart(updatedCart);
  };

  const removeFromCart = (item, event) => {
    event.stopPropagation();
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      if (existingItem.count === 1) {
        const index = updatedCart.indexOf(existingItem);
        updatedCart.splice(index, 1);
      } else {
        existingItem.count -= 1;
      }
      setCart(updatedCart);
    }
  };
  const handleClose = () => {
    setSelectedItem(null);
  };
  return (
    <div>
      <div className="category-items">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`item-box ${selectedItem === item ? "selected" : ""}`}
            onClick={() => handleItemClick(item)}
          >
            <div
              className="item-image"
              style={{ backgroundImage: `url('/food/${item.image}')` }}
            >
              <img></img>
            </div>
            <div className="item-line"></div>
            <p className="item-name">{item.name}</p>
            <div className="item-count">
              <button
                className="remove-from-cart-button"
                onClick={(e) => removeFromCart(item, e)}
              >
                -
              </button>
              <span className="item-count-text">
                {cart.find((cartItem) => cartItem.id === item.id)?.count || 0}{" "}
                lb
              </span>
              <button
                className="add-to-cart-button"
                onClick={(e) => addToCart(item, e)}
              >
                +
              </button>
            </div>
            <p className="item-price">${item.price}</p>
          </div>
        ))}
      </div>
      {selectedItem && (
  <div className="modal-overlay" onClick={handleClose}>
    <div className="item-detail-modal" onClick={(e) => e.stopPropagation()}>
      <ItemDetail
        name={selectedItem.name}
        price={selectedItem.price}
        image={selectedItem.image} // Add this line
        onClose={handleClose}
      />
    </div>
        </div>
      )}
    </div>
  );
};
export default CategoryItem;

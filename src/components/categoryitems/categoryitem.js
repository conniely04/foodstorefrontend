import React, { useState, useEffect } from "react";
import axios from "axios";
import { getfoodCategory } from "../../services/foodservices.js";
import {
  getUser,
  addToCart as addToCartService,
  removeFromCart as removeFromCartService,
} from "../../services/userService";
import "../categoryitems/categoryitem.css";
import ItemDetail from "../itemdetail/itemdetail.js";

const CategoryItem = ({ selectedCategory }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  //test
  const [quantity, setQuantity] = useState(1);
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const categoryItems = await getfoodCategory(selectedCategory);
      if (categoryItems) {
        setItems(categoryItems);
      }
    };
    if (selectedCategory) {
      fetchItems();
    }
    // Update local cart state to reflect localStorage
    const userCart = getUser()?.cart || [];
    setCart(userCart);

    //testing count code
  }, [selectedCategory]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleAddToCart = async (item, event) => {
    event.stopPropagation();

    await addToCartService(item.id, quantity, item.price);
    setCart(getUser()?.cart || []);
  };

  const handleRemoveFromCart = async (item, event) => {
    event.stopPropagation();
    console.log("Item to remove:", item._id);
    try {
      const updatedCart = await removeFromCartService(item._id, 1); // Assuming quantity to remove is always 1
      setCart(updatedCart || getUser()?.cart || []);
      console.log("CART WITH DELETED ITEM: ", updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Optionally, handle the error (e.g., show a notification to the user)
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
                onClick={(e) => handleRemoveFromCart(item, e)}
              >
                -
              </button>
              <span className="item-count-text"> 1 lb</span>
              <button
                className="add-to-cart-button"
                onClick={(e) => handleAddToCart(item, e)}
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
          <div
            className="item-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <ItemDetail
              name={selectedItem.name}
              price={selectedItem.price}
              image={selectedItem.image} // Add this line
              foodId={selectedItem._id}
              onClose={handleClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default CategoryItem;

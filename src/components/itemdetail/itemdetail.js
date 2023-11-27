import React, { useState } from "react";
import "../itemdetail/itemdetail.css";
import { useAuth } from "../../hooks/useauth"; // Import the useAuth hook
import "../../pages/ShoppingCart/ShoppingCart";
import "../categoryitems/categoryitem";

function ItemDetail({ name, price, description, weight, image, onClose, foodId }) {
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const { addCartItem } = useAuth(); // Access the addToCart function from your authentication context

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Call addToCart with the foodId and quantity
    addCartItem(foodId, quantity, price); // Pass the foodId to addToCart
    
  };

  return (
    <div className="item-container">
      <button onClick={onClose} className="close-detail-button">
        X
      </button>
      <div className="image-container">
        <img loading="lazy" src={`/food/${image}`} alt={name} />
      </div>
      <div className="details-container">
        <h3>{name}</h3>
        <p className="price"> {price} EACH </p>
        <p className="weight">Weight ~ {weight} Lbs</p>
        <div className="quantity-container">
          <button onClick={handleDecreaseQuantity}>-</button>
          <span className="quantity">{quantity}</span>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>
        <p className="description"> {description}</p>
        <button className="addbutton" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;

import React, { useState } from "react";
import "../itemdetail/itemdetail.css";
import { useAuth } from "../../hooks/useauth";
import "../../pages/ShoppingCart/ShoppingCart";
import "../categoryitems/categoryitem";

function ItemDetail({
  name,
  price,
  description,
  weight,
  image,
  onClose,
  foodId,
}) {
  const [quantity, setQuantity] = useState(1);
  const { addCartItem } = useAuth();
  const { removeCartItem } = useAuth();

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addCartItem(foodId, quantity, price); // Pass the foodId to addToCart
  };

  const handleRemoveFromCart = () => {
    console.log("Food id from itemdetail:", foodId);
    if (quantity > 0) {
      removeCartItem(foodId, quantity);
    } else {
      console.log("All items of this are removed");
    }
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
          <button
            className="remove-from-cart-button"
            onClick={handleDecreaseQuantity}
          >
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button
            className="add-to-cart-button"
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
        </div>
        <p className="description"> {description}</p>
        {/* <button className="addbutton" onClick={handleRemoveFromCart}>
          Remove
        </button> */}
        <button className="addbutton" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;

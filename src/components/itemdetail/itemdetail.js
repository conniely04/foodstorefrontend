import React, { useState } from "react";
import "../itemdetail/itemdetail.css";
import { useAuth } from "../../hooks/useauth";
import "../../pages/ShoppingCart/ShoppingCart";
import "../categoryitems/categoryitem";
import { toast } from "react-toastify";

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
    if (quantity === 0) {
      toast.error("No Item Added");
      return;
    }

    // Call addToCart with the foodId and quantity
    addCartItem(foodId, quantity, price); // Pass the foodId to addToCart
    toast.success("Item Added to Cart!");
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      removeCartItem(foodId, quantity); // Adjust your removeCartItem function to handle quantity
      // Optionally reset quantity or give feedback to the user
    } else {
      // Handle the case where quantity is zero
      console.log("All items of this are removed");
      toast.error("No Items to Remove");
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
          <button onClick={handleDecreaseQuantity}>-</button>
          <span className="quantity">{quantity}</span>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>
        <p className="description"> {description}</p>
        <button className="addbutton" onClick={handleRemoveFromCart}>
          Remove
        </button>
        <button className="addbutton" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;

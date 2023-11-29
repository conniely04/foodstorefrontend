import React, { useState, useContext } from "react";
import classes from "./ShoppingCartPage.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useauth"; // Correct capitalization

function ShoppingCart() {
  const { cart, addCartItem, removeCartItem } = useAuth();
  const [quantity, setQuantity] = useState(1);
  console.log("CART FROM SHOPPING CART: ", cart); // Retrieve cart data from useAuth

  const [itemQuantities, setItemQuantities] = useState(
    cart.foodList.reduce((acc, item) => {
      acc[item.food._id] = item.quantity;
      return acc;
    }, {})
  );

  const handleIncreaseQuantity = (item) => {
    addCartItem(item.food._id, 1, item.food.price);
    setItemQuantities((prev) => ({
      ...prev,
      [item.food._id]: prev[item.food._id] + 1,
    }));
  };

  const handleDecreaseQuantity = (item) => {
    if (itemQuantities[item.food._id] > 1) {
      addCartItem(item.food._id, -1, item.food.price);
      setItemQuantities((prev) => ({
        ...prev,
        [item.food._id]: prev[item.food._id] - 1,
      }));
    } else {
      handleRemoveFromCart(item.food._id);
    }
  };

  const handleRemoveFromCart = (foodId) => {
    removeCartItem(foodId);
    setItemQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[foodId];
      return newQuantities;
    });
  };

  const tax = (cart.totalPrice * 0.098).toFixed(2);
  const total = tax + cart.totalPrice;

  // Calculate the subtotal, totalWeight, and totalItems from cart data
  const subtotal =
    cart?.foodList?.reduce(
      (acc, item) => acc + item.quantity * item.food.price,
      0
    ) || 0;
  const totalWeight =
    cart?.foodList?.reduce(
      (acc, item) => acc + item.quantity * item.food.weight,
      0
    ) || 0;
  const totalItems =
    cart?.foodList?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <div className={classes.shoppingCartPage}>
      <div className={classes.topBar}>
        <Link to="/" className={classes.continueShoppingButton}>
          Continue Shopping
        </Link>
        <div className={classes.cartInfo}>
          <span className={classes.itemCount}>Items: {totalItems}</span>
          <Link to="/checkout" className={classes.checkoutButton}>
            Checkout
          </Link>
        </div>
        {cart?.foodList && cart.foodList.length > 0 ? (
          cart.foodList.map((item, index) => (
            <div key={index} className={classes.cartItem}>
              <img
                loading="lazy"
                src={`/food/${item.food.image}`}
                alt={item.name}
                className={classes.itemImage}
              />
              <div className={classes.itemDetails}>
                <h3>{item.food.name}</h3>
                <p>Price: ${item.food.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className={classes.itemActions}>
                <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                <button onClick={() => handleRemoveFromCart(item)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={classes.emptyMessage}>Your cart is empty.</p>
        )}
      </div>
      <div className={classes.cartSummary}>
        <h2>Summary</h2>
        <div className={classes.summaryContent}>
          <div>
            <p>Total Items: {totalItems}</p>
          </div>
          <div className={classes.summaryRow}>
            <span>Subtotal:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>
          <div className={classes.summaryRow}>
            <span>tax:</span>
            <span> $ {tax}</span>
          </div>
          <div className={classes.summaryRow}>
            <span>Total:</span>
            <span>
              {" "}
              ${(parseFloat(tax) + parseFloat(cart.totalPrice)).toFixed(2)}
            </span>
          </div>
          <div className={classes.summaryRow}>
            <span>Total Weight:</span>
            <span>{totalItems} lbs</span>
          </div>
          <Link to="/checkout" className={classes.checkoutButton}>
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;

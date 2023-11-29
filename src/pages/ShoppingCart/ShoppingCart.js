import React, { useEffect, useState } from "react";
import classes from "./ShoppingCartPage.module.css";

import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useauth"; // Correct capitalization
import {
  getUser,
  getCart,
  addToCart as addToCartService,
  removeFromCart as removeFromCartService,
} from "../../services/userService";

function ShoppingCart({}) {
  const [cart, setCart] = useAuth();

  const handleAddToCart = async (foodId) => {
    const updatedCart = await addToCartService(foodId, 1); // assuming add one item at a time
    setCart(updatedCart);
  };

  const handleRemoveFromCart = async (foodId) => {
    const updatedCart = await removeFromCartService(foodId, 1); // assuming remove one item at a time
    setCart(updatedCart);
  };

  const calculateTax = (price) => {
    return (price * 0.098).toFixed(2);
  };

  const subtotal =
    cart?.foodList?.reduce(
      (acc, item) => acc + item.quantity * item.food.price,
      0
    ) || 0;
  const totalItems =
    cart?.foodList?.reduce((total, item) => total + item.quantity, 0) || 0;
  const tax = calculateTax(subtotal);
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  const totalWeight =
    cart?.foodList?.reduce(
      (acc, item) => acc + item.quantity * item.food.weight,
      0
    ) || 0;

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
          cart?.foodList?.map((item, index) => (
            <div key={index} className={classes.cartItem}>
              {/* ... existing JSX for each item ... */}
              <button onClick={() => handleAddToCart(item.food._id)}>+</button>
              <button onClick={() => handleRemoveFromCart(item.food._id)}>
                -
              </button>
              <button onClick={() => handleRemoveFromCart(item.food._id)}>
                Remove
              </button>
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
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={classes.summaryRow}>
            <span>Tax:</span>
            <span> ${tax}</span>
          </div>
          <div className={classes.summaryRow}>
            <span>Total:</span>
            <span> ${total}</span>
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

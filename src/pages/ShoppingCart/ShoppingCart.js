import React, { useState, useEffect, useContext } from "react";
import classes from "./ShoppingCartPage.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useauth"; // Correct capitalization
import { toast } from "react-toastify";

function ShoppingCart() {
  const { cart, addCartItem, removeCartItem } = useAuth();

  console.log("CART FROM SHOPPING CART: ", cart); // Retrieve cart data from useAuth

  const [itemQuantities, setItemQuantities] = useState(
    cart.foodList.reduce((acc, item) => {
      acc[item.food._id] = item.quantity;
      return acc;
    }, {})
  );

  const handleIncreaseQuantity = async (item) => {
    try {
      const updatedCart = await addCartItem(item.food._id, 1, item.food.price);
      setItemQuantities((prev) => ({
        ...prev,
        [item.food._id]: prev[item.food._id] + 1,
      }));
      // Return the updated cart here if needed
      toast.success("Item Added to Cart");

      return updatedCart;
    } catch (error) {
      console.error("Could not increase item quantity:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleDecreaseQuantity = (item) => {
    if (itemQuantities[item.food._id] > 1) {
      addCartItem(item.food._id, -1, item.food.price);
      setItemQuantities((prev) => ({
        ...prev,
        [item.food._id]: prev[item.food._id] - 1,
      }));
      toast.info("Removed from Cart");
    } else {
      handleRemoveFromCart(item.food._id.toString(), "1");
    }
  };

  const handleRemoveFromCart = (foodId, theQuantity) => {
    removeCartItem(foodId, theQuantity);
    setItemQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[foodId];
      return newQuantities;
    });
  };

  //TOTAL AMOUNT CALCULATIONS

  const subtotal =
    cart?.foodList?.reduce(
      (acc, item) => acc + item.quantity * item.food.price,
      0
    ) || 0;

  // Calculate the tax (assuming subtotal is already in dollars)
  const taxRate = 0.098;
  const tax = parseFloat((subtotal * taxRate).toFixed(2));

  // Calculate total weight
  const totalWeight = cart.foodList.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);

  // Calculate total items
  const totalItems =
    cart?.foodList?.reduce((total, item) => total + item.quantity, 0) || 0;

  // Calculate weight fee
  const weightthreshold = 20; // This should be in weight units (e.g., pounds), not in dollars
  const weightfee = 5;
  const weightfeeapplicable = totalWeight > weightthreshold;
  const totalFee = weightfeeapplicable ? weightfee : 0;

  // Calculate the final total
  const finalTotal = parseFloat(subtotal) + tax + totalFee;

  console.log("Subtotal:", subtotal);
  console.log("Tax:", tax);
  console.log("Total Weight:", totalWeight);
  console.log("Weight Fee:", totalFee);

  localStorage.setItem("finalTotal", finalTotal);
  console.log("Final Total:", finalTotal);

  //JSX BEING RETURNED
  return (
    <div className={classes.shoppingCartPage}>
      <div className={classes.topBar}>
        <Link to="/" className={classes.continueShoppingButton}>
          Continue Shopping
        </Link>
        {cart?.foodList && cart.foodList.length > 0 ? (
          cart.foodList.map((item, index) => (
            <div key={index} className={classes.cartItem}>
              <img
                loading="lazy"
                src={`/food/${item.food.image}`}
                alt={item.food.name}
                className={classes.itemImage}
              />
              <div className={classes.itemDetails}>
                <h3>{item.food.name}</h3>
                <p>Price: ${item.food.price}</p>
                <p>Quantity: {item.quantity}</p>
                <div className={classes.itemActions}>
                  <button className="add-to-cart-button" onClick={() => handleIncreaseQuantity(item)}>+</button>
                  <button className="remove-from-cart-button" onClick={() => handleDecreaseQuantity(item)}>-</button>
                  <button className={classes.removebutton1}  onClick={() => handleRemoveFromCart(item.food._id.toString(), item.quantity)}>
                    Remove
                  </button>
                </div>

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
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={classes.summaryRow}>
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className={classes.summaryRow}>
            <span>Total Weight:</span>
            <span>{totalWeight} lbs</span>
          </div>
          <div className={classes.summaryRow}>
            <span>Weight Fee:</span>
            <span>${totalFee}</span>
          </div>
          <div className={classes.summaryRow}>
            <span>Total:</span>
            <span>${finalTotal.toFixed(2)}</span>
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
// import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
// import * as cartService from '../services/cartService'; // Adjust the path as needed
// import { getUser } from "../services/userService";

// const CartContext = createContext(null);
// const CART_KEY = 'cart';

// const EMPTY_CART = {
//   user: getUser(),
//   foodList: [],
//   totalPrice: 0,
// };

// export default function CartProvider({ children }) {
//   const initCart = getCartFromLocalStorage();
//   const [user, setUser] = useState(initCart.user || getUser());
//   const [cartItems, setCartItems] = useState(initCart.foodList);
//   const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);


//   useEffect(() => {
//     setTotalPrice(calculateTotalPrice(cartItems));
//     localStorage.setItem(CART_KEY, JSON.stringify({ user, foodList: cartItems, totalPrice }));
//   }, [user, cartItems, totalPrice]);

//   function getCartFromLocalStorage() {
//     const storedCart = localStorage.getItem(CART_KEY);
//     return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
//   }

//   function calculateTotalPrice(items) {
//     if (!Array.isArray(items) || items.length === 0) {
//       return 0; // Return 0 if items is not an array or is empty
//     }
//     return items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
//   }

//   const addToCart = async (UserId, productId, quantity) => {
//     try {
//       const response = await cartService.addToCart(UserId, productId, quantity);
//       setCartItems(response.data); // Make sure this is the correct structure
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   const contextValue = useMemo(() => ({
//     cart: { user, items: cartItems, totalPrice },
//     addToCart,
//     // Include other cart manipulation functions here
//   }), [user, cartItems, totalPrice, addToCart]);

//   return (
//     <CartContext.Provider value={contextValue}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);

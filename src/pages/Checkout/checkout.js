import React, { useState, useContext } from "react";
import { useAuth } from "../../hooks/useauth";
import "../Checkout/checkout.css";
import { useNavigate } from "react-router-dom";
import { clearCart, getCart } from "../../services/userService";
import { toast } from "react-toastify";

const Checkout = () => {
  const { createOrder, removeCartItem } = useAuth(); // Extract the createOrder function from useAuth
  const { cart, user } = useAuth();

  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState(""); // Placeholder for your payment ID logic
  const [cvv, setcvv] = useState("");
  const [phone, setphone] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [zip, setzip] = useState("");
  const [month, setmonth] = useState("");
  const [cardname, setcardname] = useState("");
  const finalTotal = parseFloat(localStorage.getItem("finalTotal")).toFixed(2);

  //test

  const handleOrder = async (event) => {
    event.preventDefault();
    // Form validation logic here
    if (!fullName) {
      toast.info("Please enter full name!");
      return;
    }
    if (!address.trim() || address.length < 5) {
      toast.info("Please enter a valid address!)");
      return;
    }
    const paymentIdNumber = parseInt(payment, 16); // or parseFloat(payment) if it can be a float
    if (isNaN(paymentIdNumber) || paymentIdNumber <= 0) {
      toast.info("Please enter a valid card number!");
      return;
    }
    const cvvnumber = parseInt(cvv, 3); // or parseFloat(payment) if it can be a float
    if (isNaN(cvvnumber) || cvvnumber <= 0) {
      toast.info("Please enter a valid cvv!");
      return;
    }
    // const phonenumber = parseInt(phone, 10); // or parseFloat(payment) if it can be a float
    // if (isNaN(phonenumber) || phonenumber <= 0) {
    //   toast.info("Please enter a phone number!");
    //   return;
    // }
    if (finalTotal <= 0) {
      toast.info("Nothing to checkout!");
      navigate("/");
      return;
    }

    try {
      const orderData = {
        name: fullName,
        address: address,
        paymentId: payment,
        cvv: cvv,
        phone: phone,
        city: city,
        country: country,
        zip: zip,
        cardname: cardname,
        totalPrice: finalTotal,
        items: cart.foodList.map((item) => ({
          food: item.food._id, // Assuming item.food contains the food object with an _id field
          quantity: item.quantity,
        })),
        user: user.id,
        // Replace with actual payment ID logic
        // Add other necessary data, such as totalPrice and items
      };

      await createOrder(orderData);
      await clearCart();

      navigate("/ordertracking");
      console.log("CLEARED CART:", cart);
      // Handle the response, e.g., show success message or handle errors
    } catch (error) {
      console.error("Error in creating order:", error);
      // Handle the error, e.g., show error message to the user
    }
  };

  return (
    <div className="checkout-page-main">
      <form onSubmit={handleOrder} className="checkout-form">
        <h2 className="checkout-title">Checkout</h2>
        
        <div className="section customer-info">
          <h3 className="section-title">Customer Information</h3>
          <div className="input-container">
            <input
              type="text"
              className="checkout-input"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
        
            <input
              type="text"
              className="checkout-input"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />
          </div>
        </div>

        <div className="section payment-info">
          <h3 className="section-title">Payment Information</h3>
              <div className="card-images">
                <img src="./socialmedia/visa.png" alt="Visa" />
                <img src="./socialmedia/mastercard.png" alt="MasterCard" />
                <img src="./socialmedia/american-express.png" alt="American Express"/>
              </div>

            <div className="input-container">
               <input
                type="text"
                placeholder="Cardholder Name"
                className="checkout-input"
                value={cardname}
                onChange={(e) => setcardname(e.target.value)}
              />
          
              <input
                type="text"
                placeholder="Card Number"
                className="checkout-input"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              />
            </div>
    
          {/* Wrap the CVV input in its own div */}
          <div className="input-container">
            <input
              type="text"
              placeholder="CVV"
              className="checkout-input"
              value={cvv}
              onChange={(e) => setcvv(e.target.value)}
            />
          </div>
        </div>

        <div className="section billing-address">
          <h3 className="section-title">Billing Address</h3>
          <div className="input-container">
            <input
              type="text"
              placeholder="Address"
              className="checkout-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
       
            <input
              type="text"
              placeholder="City"
              className="checkout-input"
              value={city}
              onChange={(e) => setcity(e.target.value)}
            />
        
            <input
              type="text"
              placeholder="Country"
              className="checkout-input"
              value={country}
              onChange={(e) => setcountry(e.target.value)}
            />
          </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Zip Code"
            className="checkout-input"
            value={zip}
            onChange={(e) => setzip(e.target.value)}
          />
        </div>
      </div>

        <div className="section current-cart">
          <h3 className="section-title">Current Cart</h3>
          <div className="cart-total-container">
            <span>Final Total: ${finalTotal}</span>
          </div>
        </div>

        <button type="submit" className="checkout1-button">Complete Checkout and Pay</button>
      </form>
    </div>
  );
};

export default Checkout;

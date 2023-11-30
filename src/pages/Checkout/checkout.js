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
  const [email, setemail] = useState("");

  const [phone, setphone] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [zip, setzip] = useState("");
  const [month, setmonth] = useState("");
  const [cardname, setcardname] = useState("");
  const finalTotal = parseFloat(localStorage.getItem("finalTotal")).toFixed(2);
  const [emailError, setEmailError] = useState("");
  const totalQuantity =
    (user &&
      cart?.foodList?.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity;
      }, 0)) ||
    0;

  // Regular expression for basic email validation

  //test

  const handleOrder = async (event) => {
    event.preventDefault();
    // Form validation logic here
    if (!fullName) {
      toast.error("Please enter full name!");
      return;
    }
    if (!address.trim() || address.length < 5) {
      toast.error("Please enter a valid address!");
      return;
    }
    const paymentIdNumber = parseInt(payment); // or parseFloat(payment) if it can be a float
    if (isNaN(paymentIdNumber) || payment.length !== 16) {
      console.log(payment.length);
      toast.error("Please enter a valid card number!");
      return;
    }
    const cvvnumber = parseInt(cvv); // or parseFloat(payment) if it can be a float
    if (isNaN(cvvnumber) || cvv.length !== 3) {
      toast.error("Please enter a valid CVV!");
      return;
    }
    const phonenumber = parseInt(phone); // or parseFloat(payment) if it can be a float
    if (isNaN(phonenumber) || phone.length !== 10) {
      toast.error("Please enter a valid phone!");
      return;
    }
    if (!city.trim() || city.length < 2) {
      toast.error("Please enter a valid city!)");
      return;
    }
    if (!country.trim() || country.length < 5) {
      toast.error("Please enter a valid country!");
      return;
    }
    const zipnumber = parseInt(zip); // or parseFloat(payment) if it can be a float
    if (isNaN(zipnumber) || zip.length !== 5) {
      toast.error("Please enter a valid zip code!");
      return;
    }
    if (!cardname.trim() || cardname.length < 2) {
      toast.error("Please enter a valid Cardholder Name!)");
      return;
    }
    function validateEmail(email) {
      // Regular expression for basic email validation
      const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (regex.test(email)) {
        // Email is valid
        return true;
      } else {
        // Email is invalid
        toast.error("Please enter a valid email address!");
        return false;
      }
    }
    const isValid = validateEmail(email);
    if (!isValid) {
      toast.error("Please enter valid email!");
    }

    if (finalTotal <= 0) {
      toast.error("Nothing to checkout!");
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
        email: email,
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
        <h2>Checkout</h2>

        <div className="customer-info">
          <h3>Customer Information</h3>
          <div className="input-container">
            <input
              type="text"
              className="checkout-input"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="text"
              className="checkout-input"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              required
            />
            <input
              type="text"
              className="checkout-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          <div className="payment-info">
            <h3>Payment Information</h3>
            <div className="input-container">
              <div className="card-images">
                <img src="./socialmedia/visa.png" alt="Visa" />
                <img src="./socialmedia/mastercard.png" alt="MasterCard" />
                <img
                  src="./socialmedia/american-express.png"
                  alt="American Express"
                />
              </div>
              <input
                type="text"
                placeholder="Cardholder Name"
                className="checkout-input"
                value={cardname}
                onChange={(e) => setcardname(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Card Number"
                className="checkout-input"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Expiry Date "
                value={month}
                onChange={(e) => setmonth(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="CVV"
              className="checkout-input"
              value={cvv}
              onChange={(e) => setcvv(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="current-cart">
          <h3>Billing Address</h3>
          <input
            type="text"
            placeholder="Address"
            className="checkout-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="City"
            className="checkout-input"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Country"
            className="checkout-input"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Zip Code"
            className="checkout-input"
            value={zip}
            onChange={(e) => setzip(e.target.value)}
            required
          />
        </div>

        <div className="current-cart">
          <h3>Current Cart</h3>
          <span>Total Items: {totalQuantity} Items</span>
          <br></br>
          <span>Final Total: ${finalTotal}</span>

          {/* Display cart items here, if necessary */}
        </div>
        <button type="submit" className="checkout-button-page">
          Complete Checkout and Pay
        </button>
      </form>
    </div>
  );
};

export default Checkout;

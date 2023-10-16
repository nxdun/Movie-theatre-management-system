import React, { useState } from "react";
import "./Payment.css";
import CreditCardInput from "react-credit-card-input";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

const Payment = () => {
  
  const [Reduction, setReduction] = useState(null);
  const cusId = "6528c2a2902183a8ffbd0681";
  

  useEffect(() => {
    const getLoyaltyPoints = () => {
      Promise.all([
        axios.get(`/customer/get/${cusId}`),
        axios.get("/loyalty/"),
      ])
        .then(([customerRes, loyaltyRes]) => {
          const customer = customerRes.data;
          const loyalty = loyaltyRes.data;
          console.log("customer", customer);
          console.log("loyalty", customer.customer.Type 
          );

          switch (true) {
            case !customer.customer.Type:
              setReduction(200);
              break;

            case customer.customer.Type &&
              (customer.customer.LoyaltyPoints === null ||
                customer.customer.LoyaltyPoints < loyalty.startingPoints):
              setReduction(0);
              break;

            case customer.customer.Type &&
              customer.customer.LoyaltyPoints >= loyalty.maximumPoints:
              setReduction(loyalty.maximumPoints);
              break;

            case customer.customer.Type &&
              customer.customer.LoyaltyPoints >= loyalty.startingPoints:
              setReduction(customer.customer.LoyaltyPoints);
              break;

            default:
              setReduction(null);
              break;
          }

          if (Reduction > 0 && customer.customer.Type === true) {
            const pointToCashConversionRate = loyalty.pointToCashConversionRate;
            setReduction(Reduction * pointToCashConversionRate);
            console.log("xr", Reduction);
          }
      
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setReduction(null)
        });
    };

    getLoyaltyPoints(); // Call the function when the component mounts
    console.log("Reduction", Reduction);
  }, []);

  // Fetch cart items from Redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const navigate = useNavigate();

  // Calculate the total price of items in the cart
  const totalCartPrice =
    cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    cardHolderName: "",
  });

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error message when the user starts typing again
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
    console.log("Number change", e.target.value);
  };

  const handleCardExpiryChange = (e) => {
    setExpiry(e.target.value);
    console.log("Expiry change", e.target.value);
  };

  const handleCardCVCChange = (e) => {
    setCVC(e.target.value);
    console.log("CVC change", e.target.value);
  };

  const handleCardNumberBlur = (e) => {
    console.log("Number blur", e.target.value);
  };

  const handleCardExpiryBlur = (e) => {
    console.log("Expiry blur", e.target.value);
  };

  const handleCardCVCBlur = (e) => {
    console.log("CVC blur", e.target.value);
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateCardHolderName = (name) => {
    // Regular expression to allow only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationErrors = {};

    // Validate email
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    // Validate phone number
    if (!formData.phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = "Phone number must contain only digits";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = "Phone number must be 10 digits";
    }

    // Validate card holder name
    if (!formData.cardHolderName) {
      validationErrors.cardHolderName = "Card holder name is required";
    } else if (!validateCardHolderName(formData.cardHolderName)) {
      validationErrors.cardHolderName = "Invalid characters in the name";
    }

    if (Object.keys(validationErrors).length === 0) {
      const paymentData = {
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        cardHolderName: formData.cardHolderName,
        cartItems: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.qty,
          total: item.price * item.qty
        })),
        totalCartPrice,
      };

      try {
        // Send the paymentData to your server for saving to MongoDB
        await axios.post("http://localhost:3000/payment", paymentData);
        console.log("Payment data sent to the databse");
        // Navigate to the Success page
        navigate('/success', { state: { cartItems: cartItems,email: formData.email,phoneNumber: formData.phoneNumber } });
        Swal.fire({
          icon: "success",
          title: "Payment Prosessing...",
          showConfirmButton: false,
          timer: 900,
        });
      } catch (error) {
        console.error("An error occurred:", error);
        // Navigate to the cancel page
        navigate("/cancel");
      } finally {
        setIsLoading(false); // Set loading state back to false
      }
    } else {
      setErrors(validationErrors);
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please Enter Payment Details!",
      });
    }
  };

  return (
    <div>
      <div className="pcartitem">
        <label htmlFor="cart_items" className="pinput_label">
          Cart Items
        </label>
        <ol>
          {cartItems.map((item) => (
            <li key={item.product}>
              {item.name} - Price: {item.price}, Quantity: {item.qty}, Total:{" "}
              {item.price * item.qty}
            </li>
          ))}
        </ol>
        <p className="ptotalprice">
          Total Cart Price: {totalCartPrice} LKR
          {Reduction !== null && (
            <span>
              &nbsp;- {Reduction} &nbsp; =  &nbsp;
              {(totalCartPrice - Reduction)} LKR
              </span>
          )}
        </p>
      </div>
      <div className="paybody">
        <div className="pmodal">
          <form className="pform" onSubmit={handleSubmit}>
            <div className="pseparator">
              <hr className="pline" />
              <p>GALAXY CINEMA PAYMENTS</p>
              <hr className="pline" />
            </div>
            <div className="credit-card-info--form">
              <div className="input_container">
                <label htmlFor="email_field" className="input_label">
                  Email
                </label>
                <input
                  id="email_field"
                  className="input_field"
                  type="text"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                <span className="error">{errors.email}</span>
              </div>
              <div className="input_container">
                <label htmlFor="phone_field" className="input_label">
                  Phone Number
                </label>
                <input
                  id="phone_field"
                  className="input_field"
                  type="number"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <span className="error">{errors.phoneNumber}</span>
              </div>
              <div className="input_container">
                <label htmlFor="name_field" className="input_label">
                  Card holder name
                </label>
                <input
                  id="name_field"
                  className="input_field"
                  type="text"
                  name="cardHolderName"
                  placeholder="Enter Card holder name"
                  value={formData.cardHolderName}
                  onChange={handleChange}
                />
                <span className="error">{errors.cardHolderName}</span>
              </div>
              <div className="input_container">
                <label htmlFor="card_input" className="input_label">
                  Credit Card Details
                </label>
                <CreditCardInput
                  onError={({ inputName, err }) =>
                    console.log(
                      `Credit card input error (${inputName}): ${err}`
                    )
                  }
                  cardCVCInputProps={{
                    onBlur: handleCardCVCBlur,
                    onChange: handleCardCVCChange,
                    onError: (err) => console.log(`CVC error: ${err}`),
                  }}
                  cardExpiryInputProps={{
                    onBlur: handleCardExpiryBlur,
                    onChange: handleCardExpiryChange,
                    onError: (err) => console.log(`Expiry error: ${err}`),
                  }}
                  cardNumberInputProps={{
                    onBlur: handleCardNumberBlur,
                    onChange: handleCardNumberChange,
                    onError: (err) => console.log(`Number error: ${err}`),
                  }}
                />
              </div>
            </div>
            <button className="purchase--btn" type="submit">
              Purchase
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;

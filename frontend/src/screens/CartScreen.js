import "./CartScreen.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

//Componets
import CartItem from "../components/CartItem";

//Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [selectedGateway, setSelectedGateway] = useState('stripe');

  const cart = useSelector((state) => state.cart); //select state and what want from state
  const { cartItems } = cart; //access cart items

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  }; // qty handler

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  }; //remove from cart

  //subtotal count increment when item qty updated
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0); //each item qty added to cartCount and return
  }; //get cart count



  //loyality
  const [clicked, setClicked] = useState(false);
  console.log(clicked);
  //handler  to switch setClicked between truefalse
  const handleClick = () => {
    if (reduction !== null && reduction > 0 && clicked === true) {
      // Calculate the reduction based on loyalty points
      reduction -= getCartSubTotal();
    } else {
      reduction = getCartSubTotal();
    }
    setClicked(!clicked);
  };
  const cusId = "650eb1a3a2be68cba0892a86";
  let reduction = null; // Initialize reduction as null
  const getLoyaltyPoints = () => {
    // Use Promise.all to make concurrent requests
    Promise.all([
      axios.get(`/customer/get/${cusId}`),
      axios.get("/loyality/"), //
    ])
      .then(([customerRes, loyalityRes]) => {
        const customer = customerRes.data;
        const loyalty = loyalityRes.data;
        console.log("customer", customer);
        console.log("loyalty", loyalty);

        switch (true) {
          case !customer.customer.Type:
            reduction = null;
            break;

          case customer.customer.Type &&
            (customer.customer.LoyaltyPoints === null ||
              customer.customer.LoyaltyPoints < loyalty.startingPoints):
            reduction = 0;
            break;

          case customer.customer.Type &&
            customer.customer.LoyaltyPoints >= loyalty.maximumPoints:
            reduction = loyalty.maximumPoints;
            break;

          case customer.customer.Type &&
            customer.customer.LoyaltyPoints >= loyalty.startingPoints:
            reduction = customer.customer.LoyaltyPoints;
            break;

          default:
            reduction = null;
            break;
        }
        console.log("pre", reduction);
        if (reduction > 0 && customer.customer.Type === true) {
          const pointToCashConversionRate = loyalty.pointToCashConversionRate;
          reduction *= pointToCashConversionRate;
          console.log(reduction);
        } else if (reduction === 0 && customer.customer.Type === true) {
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  getLoyaltyPoints();

  

  const getCartSubTotal = () => {
    const value = cartItems.reduce((price, item) => item.price * item.qty + price, 0);
    
    if (reduction !== null && reduction > 0 && value > reduction && clicked === true) {
      // Subtract the reduction amount from the subtotal
      return value - reduction;
    } else {
      return value;
    }
  };
   //get cart subtotal price calculate according to qty
  //Payment gatway intergration
  const makePayment = async () => {
    if (selectedGateway === 'stripe') {
      // Stripe payment logic 
      const stripe = await loadStripe('pk_test_51Ns9obAuazamskfxFgZzz5Z9X2tDM9NDLLI0Wserb178ONKNbJ8hnbb7a9AqqCgEd0PTJDxKKYgUZDwnMy6skPcM00LieKKLAa');
      
      const body = {
        products: cartItems,
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const session = await response.json();

          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });

          if (result.error) {
            alert(result.error.message);
          }
        } else {
          throw new Error('Failed to create checkout session');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while processing your payment.');
      }
    } else {
      // Navigate to the custom payment gateway route
      navigate('/payment'); // Update the route as needed
    }
  };

  return (
    <div className="cartscreen">
      <div className="cartscreen__left">
        <h2> Shopping Cart </h2>

        {cartItems.length === 0 ? (
          <div>
            Your Cart is Empty <Link to="/">Go Back</Link>
          </div> //0 == no items in cart if cart is empty show go back
        ) : (
          cartItems.map((item) => (
            <div>
            <CartItem
              key={item.product}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeHandler={removeHandler}
            />
            &nbsp;
            </div>
          )) //else show cart items
        )}
      </div>
      <div className="cartscreen__right">
        <div className="cartscreen__info">
          <p>Total ({getCartCount()}) items in the cart</p>
         <b><p>Total Cost Rs.{getCartSubTotal().toFixed(2)}</p></b> 
        </div>
        <div>
          <div className="field">
            <label>Enable loyality discount</label>
            <input
              type="checkbox"
              name="enableManualConfig"
              onChange={handleClick}
            />
          </div>

          <div>
          <label htmlFor="paymentGateway">Select Payment Gateway:</label>
          <select
            id="paymentGateway"
            value={selectedGateway}
            onChange={(e) => setSelectedGateway(e.target.value)}
          >
            <option value="stripe">Pay with Stripe</option>
            <option value="custom">Pay with Galaxy Gateway</option>
          </select>
          </div>

          &nbsp;
          <button onClick={makePayment}>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;

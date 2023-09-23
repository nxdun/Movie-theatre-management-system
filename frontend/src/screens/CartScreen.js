import './CartScreen.css';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

//Componets
import CartItem from '../components/CartItem';

//Actions
import {addToCart,removeFromCart} from '../redux/actions/cartActions';

const CartScreen = () => {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);//select state and what want from state
    const {cartItems} = cart;//access cart items

    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, qty));
    }// qty handler

    const removeHandler = (id) => {
        dispatch(removeFromCart(id));
    }//remove from cart

    //subtotal count increment when item qty updated
    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);//each item qty added to cartCount and return
    }//get cart count

    const getCartSubTotal = () => {
        return cartItems.reduce((price, item) => item.price * item.qty + price, 0);//each item price * qty added to cartCount and return
    }//get cart subtotal price calculate according to qty
    
    //Payment gatway intergration
    const makePayment = async () => {
        const stripe = await loadStripe(
          'pk_test_51Ns9obAuazamskfxFgZzz5Z9X2tDM9NDLLI0Wserb178ONKNbJ8hnbb7a9AqqCgEd0PTJDxKKYgUZDwnMy6skPcM00LieKKLAa' // Replace with your actual Stripe public key
        );
    
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
          alert('An error occurred while processing your payment please try again..');//if error occured show alert
        }
      };


    return (<div className="cartscreen"> 
    <div className="cartscreen__left">
        <h2> Shopping Cart </h2>

            {cartItems.length === 0 ? (
                <div>
                Your Cart is Empty <Link to="/shop">Go Back</Link>
            </div>//0 == no items in cart if cart is empty show go back
            ) : ( cartItems.map((item) => <CartItem 
            key ={item.product} item={item} qtyChangeHandler ={qtyChangeHandler} removeHandler ={removeHandler} />)//else show cart items
            )}
                
        
    </div>
    <div className="cartscreen__right">
        <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>Rs.{getCartSubTotal().toFixed(2)}</p>
            </div>
            <div>
              <button>Redeem Loyality Points</button>
            <button onClick={makePayment}>Proceed To Checkout</button>
            </div>     
    </div>
     </div>
    );
    

};

export default CartScreen;
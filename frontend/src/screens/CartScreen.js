import './CartScreen.css';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

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

    

    return (<div className="cartscreen"> 
    <div className="cartscreen__left">
        <h2> Shopping Cart </h2>

            {cartItems.length === 0 ? (
                <div>
                Your Cart is Empty <Link to="/shop">Go Back</Link>
            </div>//0 == no items in cart if cart is empty show go back
            ) : ( cartItems.map((item) => <CartItem item={item} qtyChangeHandler ={qtyChangeHandler} removeHandler ={removeHandler} />)//else show cart items
            )}
                
        
    </div>
    <div className="cartscreen__right">
        <div className="cartscreen__info">
            <p>Subtotal (0) items</p>
            <p>Rs 499.99</p>
            </div>
            <div>
                <button>Proceed To Checkout</button>

            </div>     
    </div>
     </div>
    );
    

};

export default CartScreen;
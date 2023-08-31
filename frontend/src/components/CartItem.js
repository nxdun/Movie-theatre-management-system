import './CartItem.css';
import { Link } from 'react-router-dom';


const CartItem = () => {
    return (
        <div className="cartitem">
            <div className="cartitem__image">
            <img src="https://cdn.entertainment-focus.com/wp-content/uploads/2023/05/18224411/fastx_intl_16x9_packshot_publi-1-696x392.jpg" alt="product name" className="cartitem__image"/>
            </div>
            <Link to={`/product/${111}`} className="cartitem__name">
                <p>Product 1</p>
            </Link>
            <p className="cartitem__price">$499.99</p>
            <select className="cartitem__select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <button className="cartitem__deleteBtn">
                <i className="fas fa-trash"></i>
            </button>
            </div>
    )
}

export default CartItem;
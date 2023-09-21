import './Product.css';
import { Link } from "react-router-dom";

const Product = ({imageUrl, name, price, description, productId}) => {
  return (
    <div className="product">
      <img src={imageUrl} alt={name}/>

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{description.substring(0, 100)}...</p>

        <p className="info__price">Rs{price}</p>

        <Link to={`/product/${productId}`} className="info__button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;

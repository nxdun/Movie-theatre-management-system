import './Product.css';
import { Link } from "react-router-dom";

const Product = ({imageUrl, name, price, description, productId}) => {
  return (
    <div className="product">
      <div className="scard">

      <img src={imageUrl} alt={name}/>

      <div className="content-box">
        <span className="info__name">{name}</span>

        <p className="info__description">{description.substring(0, 100)}...</p>

        <p className="info__price">Rs{price}</p>

        <span className="info__button">
        <Link to={`/prd/${productId}`}>
          See more
        </Link>
        </span>
      </div>
      </div>
    </div>
  );
};

export default Product;

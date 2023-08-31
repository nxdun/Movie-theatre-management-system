import './Product.css';
import { Link } from 'react-router-dom';

const Product = () => {
  return (
    <div className="product">
      <img src="https://cdn.entertainment-focus.com/wp-content/uploads/2023/05/18224411/fastx_intl_16x9_packshot_publi-1-696x392.jpg" alt="product 1" />

      <div className="product__info">
        <p className="info__name">product 01</p>

        <p className="info__description">Hello world...</p>

        <p className="info__price">Rs900</p>

        <Link to={`/product/${1111}`} className="info__button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
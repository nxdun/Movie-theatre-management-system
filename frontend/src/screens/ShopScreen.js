import './ShopScreen.css'
import Footer from '../shared/Footer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts as listProducts } from '../redux/actions/productActions';
import Product from '../components/Product';

const ShopScreen = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.getProducts);



  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    // Update filteredProducts when products change (initial load)
    setFilteredProducts(products);
  }, [products]);

  const searchHandler = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchInput(keyword);

    // Filter products based on the search input
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(keyword)
    );

    // Update the filteredProducts state
    setFilteredProducts(filtered);
  };

  return (
    <div>
    <div className="homescreen">
      <h1 className="homescreen__title">Deals and Exclusives</h1>
      <h2>Get the best deals and exclusives on your favorite movies !!</h2>
      <div className="search">
      <div className="input__container">
        
      <div className="shadow__input"></div>
      <button className="input__button__shadow">
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
      <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#17202A"></path>
      </svg>
      </button>

        <input
          type="text"
          placeholder="Search Products..."
          className="input__search"
          value={searchInput}
          onChange={searchHandler}
        />
      </div>
      </div>

      <div className="homescreen__products">
        {loading ? (
          <div className="screen">
          <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <h1>Loading Products...</h1>
          </div>
        </div>
        ) : error ? (
          <h2>{error}</h2>
        ) : filteredProducts.length === 0 ? (
          <h2>No results found.</h2>
        ) : (
          filteredProducts.map((product) => (
            <Product
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          ))
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
};
export default ShopScreen;
import './ShopScreen.css'
import { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
//Components
import Product from '../components/Product';

//Actions
import { getProducts as listProducts } from '../redux/actions/productActions';//request to backend to get products

const ShopScreen = () => {
    const dispatch = useDispatch();
    const getProducts = useSelector((state) => state.getProducts); //Get Products
    const { products, loading, error } = getProducts;//before rendering loding adn error check

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    
//No loading No Error if none of these are true map through products

    return (
        <div className="homescreen">
        <h1 className="homescreen__title">Deals and Exclusives</h1>
        <h2>Get the best deals and exclusives on your favorite movies !!</h2>
        <div className="homescreen__products">
            {loading ? <h2>Loading Products....</h2> : error ? <h2>{error}</h2> : products.map((product => 
                <Product key={product._id} productId={product._id}
                name ={product.name}
                price={product.price}
                description={product.description}
                imageUrl={product.imageUrl}/>)
                )}

        </div>
        </div>
    );
};
export default ShopScreen;
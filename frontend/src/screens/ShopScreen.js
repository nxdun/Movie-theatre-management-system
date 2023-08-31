import './ShopScreen.css'

//Components
import Product from '../components/Product';

const Home = () => {
   
    return (
        <div className="homescreen">
        <h1 className="homescreen__title">Deals and Exclusives</h1>
        <h2>Get the best deals and exclusives on your favorite movies !!</h2>
        <div className="homescreen__products">
            <Product/>
            </div>
        </div>
    );
};
export default Home;

import './App.css';
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";


// Screens
import ShopScreen from "./screens/ShopScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

// Components
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      
      <main className="app">
        <Routes>
          <Route exact path="/shop" element={<ShopScreen />} />
          <Route exact path="/product/:id" element={<ProductScreen />} />
          <Route exact path="/cart" element={<CartScreen />} />
          
        </Routes>
      </main>
    </Router>
  );
}

export default App;

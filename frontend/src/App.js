
import './App.css';
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
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

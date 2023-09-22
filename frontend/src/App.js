
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Screens
import ShopScreen from "./screens/ShopScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

// Components

// import Backdrop from "./components/Backdrop";
// import SideDrawer from './components/SideDrawer';
import Success from "./components/Success";
import Cancel from "./components/Cancel";

//adminscreens
import PrivateScreenDash from "./screens/privatedash";
import AddPrivateRoom from './screens/addPrivRoom';
import ReviewBookings from "./screens/viewPrivScBookings";
import GenerateReport from "./screens/viewPrivScBookingReport";
import EditPrivateRoom from "./screens/editPrivRoom";
import LoyaltyDash from './screens/LoyalityDash';

//userscreens
import UserBooking from "./screens/userBooking"; //import userScreen component
import UserScreen from "./screens/userScreen"; //import userBooking component

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Routes>
        {/* nadun */}
        <Route path="/" exact element={<LoyaltyDash />} />
        {/* dunal */}
        <Route path="/privatedash" exact element={<PrivateScreenDash />} />
        <Route path="/addroom" exact element={<AddPrivateRoom />} />
        <Route path="/editroom" exact element={<EditPrivateRoom />} />
        <Route path="/reviewbooking" exact element={<ReviewBookings />} />
        <Route path="/viewreport" exact element={<GenerateReport />} />
        <Route path="/user1" exact element={<UserScreen />} />
        <Route path="/userbooking" exact element={<UserBooking />} />
        {/* vishwa */}
        
        {/* <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
        <Backdrop show={sideToggle} click={() => setSideToggle(false)} /> */}
        <main className="app">
          <Routes>
            <Route exact path="/shop" element={<ShopScreen />} />
            <Route exact path="/product/:id" element={<ProductScreen />} />
            <Route exact path="/cart" element={<CartScreen />} />
            <Route exact path="/success" element={<Success />} />
            <Route exact path="/cancel" element={<Cancel />} />
          </Routes>
        </main>
      </Routes>
    </Router>
  );
}

export default App;

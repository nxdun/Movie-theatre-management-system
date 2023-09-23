
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import "./App.css";
  
  /* vishwa screen and components*/
  // Screens
  import ShopScreen from "./screens/ShopScreen";
  import ProductScreen from "./screens/ProductScreen";
  import CartScreen from "./screens/CartScreen";

  import RouteWrapper from './RouteWrapper';// Wrap the routes with the navbar, sidedrawer, and backdrop
  
  // Components
  import Success from "./components/Success";
  import Cancel from "./components/Cancel";
  import React from 'react';
  
  
  //adminscreens
  import PrivateScreenDash from "./screens/privatedash";
  import AddPrivateRoom from './screens/addPrivRoom';
  import ReviewBookings from "./screens/viewPrivScBookings";
  import GenerateReport from "./screens/viewPrivScBookingReport";
  import EditPrivateRoom from "./screens/editPrivRoom";
  import LoyalityDash from './screens/LoyalityDash';
  
  //userscreens
  import UserBooking from "./screens/userBooking"; //import userScreen component
  import UserScreen from "./screens/userScreen"; //import userBooking component
  function App() {
    
    return (
      <Router>

      <main className="app">
      <Routes>
        {/* nadun */}
        <Route path="/loyality/dashboard" exact element={<LoyalityDash />} />
        {/* dunal */}
        <Route path="/privatedash" exact element={<PrivateScreenDash />} />
        <Route path="/addroom" exact element={<AddPrivateRoom />} />
        <Route path="/editroom" exact element={<EditPrivateRoom />} />
        <Route path="/reviewbooking" exact element={<ReviewBookings />} />
        <Route path="/viewreport" exact element={<GenerateReport />} />
        <Route path="/user1" exact element={<UserScreen />} />
        <Route path="/userbooking" exact element={<UserBooking />} />

         {/*vishwa's route paths  */}
         <Route element={<RouteWrapper />}> {/* Wrap the routes */}
            <Route exact path="/shop" element={<ShopScreen />} />
            <Route exact path="/prd/:id" element={<ProductScreen />} />
            <Route exact path="/cart" element={<CartScreen />} />
            <Route exact path="/success" element={<Success />} />
            <Route exact path="/cancel" element={<Cancel />} />
          </Route>

      </Routes>
      </main>
    </Router>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import ConcessionManagement from "./components/ConcessionManagement/ConcessionManagement";
import ProductList from "./components/ConcessionManagement/components/ProductList/ProductList";
import StockList from "./components/ConcessionManagement/components/StockList/StockList";
import SupplierList from "./components/ConcessionManagement/components/SupplierList/SupplierList";
import Dashboard from "./components/Dashboard/Dashboard";
import MainLayout from "./components/MainLayout/MainLayout";

/* vishwa screen and components*/
// Screens
import ShopScreen from "./screens/ShopScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

import RouteWrapper from "./RouteWrapper"; // Wrap the routes with the navbar, sidedrawer, and backdrop

// Components
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import React from "react";

//adminscreens
import PrivateScreenDash from "./screens/privatedash";
import AddPrivateRoom from "./screens/addPrivRoom";
import ReviewBookings from "./screens/viewPrivScBookings";
import GenerateReport from "./screens/viewPrivScBookingReport";
import EditPrivateRoom from "./screens/editPrivRoom";
import LoyalityDash from "./screens/LoyalityDash";
import Advertisement from "./screens/Advertisement";
//userscreens
import UserBooking from "./screens/userBooking";
import UserScreen from "./screens/userScreen";
import AddMoviesMainPage from "./screens/AddMoviesMainPage";
import MovieShedularCalPrevPage from "./screens/MovieShedularCalPrevPage";
import UpdateMovieShedularPage from "./screens/UpdateMovieShedularPage";
import Showtimes from "./screens/Showtimes";
import SeatUpdate from "./pages/SeatUpdate";
import SeatManage from "./pages/SeatManage";
import AddMovie from "./components/Movie/AddMovie";
import AllMovies from "./components/Movie/AllMovies";
import UpdateMovie from "./components/Movie/UpdateMovie";
import HomeMain from "./components/Movie/Home";
import DetailsM from "./components/Movie/Details";
import SeatSelect from "./pages/SeatSelect";
import Slip from "./pages/Slip";
import Login from "./screens/Login";
function App() {
  return (
    <Router>
      <main className="app">
        <Routes>
          {/* nadun */}
          <Route path="/loyality/dashboard" exact element={<LoyalityDash />} />
          {/* dunal */}
          <Route
            path="/privateScreen/DashBoard"
            exact
            element={<PrivateScreenDash />}
          />
          <Route
            path="/privateScreen/Addroom"
            exact
            element={<AddPrivateRoom />}
          />
          <Route
            path="/privateScreen/:privScId"
            element={<EditPrivateRoom />}
          />
          <Route
            path="/privateScreen/Reviewbooking"
            exact
            element={<ReviewBookings />}
          />
          <Route
            path="/privateScreen/Viewbookingreport"
            exact
            element={<GenerateReport />}
          />
          <Route path="/user1" exact element={<UserScreen />} />
          <Route path="/userbooking" exact element={<UserBooking />} />
          <Route path="/adv" exact element={<Advertisement />} />
          {/*vishwa's route paths  */}
          <Route element={<RouteWrapper />}>
            {" "}
            {/* Wrap the routes */}
            <Route exact path="/shop" element={<ShopScreen />} />
            <Route exact path="/prd/:id" element={<ProductScreen />} />
            <Route exact path="/cart" element={<CartScreen />} />
            <Route exact path="/success" element={<Success />} />
            <Route exact path="/cancel" element={<Cancel />} />
          </Route>
          {/*shehan's route paths  */}
          <Route path="/addMovie" exact element={<AddMovie />} />{" "}
          {/*we write exact eod for only display path=/ for exact /*/}
          <Route path="/movie" exact element={<AllMovies />} />
          <Route path="/updateMovie/:userId" element={<UpdateMovie />} />
          <Route path="/" element={<HomeMain />} />
          <Route path="/Details" element={<DetailsM />} />
          {/* Sachiras Pages */}
          <Route exact path="/showtime" element={<Showtimes />} />
          <Route path="/sheduleMovie" exact element={<AddMoviesMainPage />} />
          <Route
            path="/calender"
            exact
            element={<MovieShedularCalPrevPage />}
          />
          <Route
            path="/sheduleMovie/:sheduleId"
            exact
            element={<UpdateMovieShedularPage />}
          />

          {/* omins Pages */}
          <Route path="/seatbooking" element={<SeatSelect />} />
          <Route path="/Slip/:seatId/:theaterId/:price" element={<Slip />} />
          <Route path="/SeatManage" element={<SeatManage />} />
          <Route
            path="/SeatUpdate/:bookingId/:seatId"
            element={<SeatUpdate />}
          />
          <Route path="concession/supplier_list" element={<SupplierList />} />
          <Route path="concession/product_list" element={<ProductList />} />
          <Route path="concession/stock_list" element={<StockList />} />
          {/*Aviska's route paths*/}
          <Route path="/admindash" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="concession" element={<ConcessionManagement />}>
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          {/*Loggin route*/}
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

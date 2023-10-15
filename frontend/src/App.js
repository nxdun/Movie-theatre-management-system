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
import Search from "./components/Movie/Search";
/* vishwa screen and components*/
// Screens
import ShopScreen from "./screens/ShopScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Payment from "./screens/Payment";

import RouteWrapper from "./RouteWrapper"; // Wrap the routes with the navbar, sidedrawer, and backdrop
import Register from "./components/CustomerRegisterForm";
// Components
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import React from "react";

//adminscreens
import PrivateScreenDash from "./screens/privatedash";
import AddPrivateRoom from "./components/PrivateScreens/addPrivRoom";
import ReviewBookings from "./components/PrivateScreens/viewPrivScBookings";
import GenerateReport from "./components/PrivateScreens/viewPrivScBookingReport";
import EditPrivateRoom from "./components/PrivateScreens/editPrivRoom";
import LoyalityDash from "./screens/LoyalityDash";
import Advertisement from "./screens/Advertisement";
import PaymentRecords from "./screens/paymentRecords";
//userscreens
import UserScBooking from "./components/PrivateScreens/PrivCusUI/UserScBooking";
import PriUserScreen from "./components/PrivateScreens/PrivCusUI/PrivCusUI";
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
import DetailsM from "./components/Movie/DetailsM";
import SeatSelect from "./pages/SeatSelect";
import Slip from "./pages/Slip";
import Upslip from "./pages/Upslip";
import Login from "./screens/Login";
import FoodAndBeverage from "./components/ConcessionManagement/components/FoodAndBeverage/FoodAndBeverage.jsx";

function App() {
  return (
    <Router>

      <Routes>
        {/* nadun */}
        <Route path="/loyality/dashboard" exact element={<LoyalityDash />} />
        <Route path="/register" exact element={<Register />} />
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
          <Route path="/editprivatescreen/:privScId" element={<EditPrivateRoom />}/>
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
          <Route path="/PrivScUI" exact element={<PriUserScreen />} />
          <Route path="/PrivScBooking/:privScId" element={<UserScBooking />} />
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
          <Route exact path="/payment" element={<Payment />} />
        </Route>
        <Route exact path="/paymentrecords" element={<PaymentRecords/>} />


        
        {/*shehan's route paths  */}
        <Route path="/addMovie" exact element={<AddMovie />} />{" "}
        {/*we write exact eod for only display path=/ for exact /*/}
        <Route path="/movie" exact element={<AllMovies />} />
        <Route path="/updateMovie/:userId" element={<UpdateMovie />} />
        <Route path="/" element={<HomeMain />} />
        <Route exact path="/details/:movieId" element={<DetailsM />} />
        <Route path="/" exact element={<HomeMain/>} />  
        <Route path="/search" element={<Search />} />

        {/* Sachiras Pages */}
   
        <Route exact path="/showtime/:movieNM" element={<Showtimes />} />
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
        <Route path="/Slip/:seatId/:theaterName/:movieName/:showtime/:price" element={<Slip />} />
        <Route path="/Upslip/:selectedSeats/:theaterName/:movieName/:showtime/:totalPrice" element={<Upslip />} />
        <Route path="/SeatManage" element={<SeatManage />} />
        <Route
          path="/SeatUpdate/:bookingId/:seatId/:theaterName/:movieName/:showtime"
          element={<SeatUpdate />}
        />

        {/*Aviska's route paths*/}
        <Route path="/manager" element={<MainLayout />}>
          <Route path="dashboard" index element={<Dashboard />} />
          <Route path="concession" element={<ConcessionManagement />}>
            <Route path="supplier_list" element={<SupplierList />} />
            <Route path="product_list" element={<ProductList />} />
            <Route path="stock_list" element={<StockList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          <Route index element={<Navigate to="/manager/dashboard" />} />
          <Route path="*" element={<Navigate to="/manager/dashboard" />} />
        </Route>
      
        {/*Login route*/}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/ccc" element={<FoodAndBeverage />} />

      </Routes>

    </Router>
  );
}

export default App;

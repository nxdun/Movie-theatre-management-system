
import './App.css';
import React from 'react';
//import { Switch } from 'react-router-dom'; ----> this works with react-router-dom v5
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//adminscreens
import PrivateScreenDash from './privateDash/screens/privatedash';
import AddPrivateRoom from './privateDash/screens/addPrivRoom';
import ReviewBookings from './privateDash/screens/viewPrivScBookingReport';
import GenerateReport from './privateDash/screens/viewPrivScBookings';
import EditPrivateRoom from './privateDash/screens/editPrivRoom';
import LoyalityDash from './screens/LoyalityDash';

//userscreens
import UserBooking from './privateDash/screens/userBooking'; //import userScreen component
import UserScreen from './privateDash/screens/userScreen'; //import userBooking component

function App() {
  
  return (

    <Router>
      
      <Routes>
         {/*nadun*/}
        <Route path="/loyality/dashboard" exact element={<LoyalityDash />} />
         {/*dunal*/}
        <Route path="/privatedash" exact element={<PrivateScreenDash />} />  
        <Route path="/addroom" exact element={<AddPrivateRoom />} />
        <Route path="/editroom" exact element={<EditPrivateRoom />} />
        <Route path="/reviewbooking" exact element={<ReviewBookings />} />
        <Route path="/viewreport" exact element={<GenerateReport />} />
        <Route path="/user1" exact element={<UserScreen />} />
        <Route path="/userbooking" exact element={<UserBooking />} />
        <Route path="/user-booking" exact element={<UserBooking />} />
  
      </Routes>

    </Router>
  );
}

export default App;

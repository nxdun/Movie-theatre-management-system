import './App.css';
import React from 'react';
//import { Switch } from 'react-router-dom'; ----> this works with react-router-dom v5
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//adminscreens
import PrivateScreenDash from './privateDash/screens/privatedash';
import AddPrivateRoom from './privateDash/screens/addPrivRoom';
import ReviewBookings from './privateDash/screens/viewBooking';
import GenerateReport from './privateDash/screens/viewReport';
import EditPrivateRoom from './privateDash/screens/editPrivRoom';

//userscreens
import UserScreen from './userInterface/screens/userScreen'; //import userScreen component
import UserBooking from './userInterface/screens/userBooking'; //import userBooking component

function App() {
  
  return (

    <Router>
      
      <Routes>

        <Route path="/" exact element={<PrivateScreenDash />} />  {/*this will be private-dash*/}
        <Route path="/add-room" exact element={<AddPrivateRoom />} />
        <Route path="/edit-room" exact element={<EditPrivateRoom />} />
        <Route path="/review-booking" exact element={<ReviewBookings />} />
        <Route path="/view-report" exact element={<GenerateReport />} />

        
        


        <Route path="/user1" exact element={<UserScreen />} />
        <Route path="/user-booking" exact element={<UserBooking />} />
  
      </Routes>

    </Router>
  );
}

export default App;

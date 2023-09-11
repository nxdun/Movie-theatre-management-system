import './App.css';
import React from 'react';
//import { Switch } from 'react-router-dom'; ----> this works with react-router-dom v5
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//adminscreens
import PrivateScreenDash from './privateDash/screens/privatedash';
import AddPrivateRoom from './privateDash/screens/addPrivRoom';
import EditPrivateRoom from './privateDash/screens/editPrivRoom';
import BenefitDashboard from './benefitDash/screens/benefitDash';

//userscreens
import UserScreen from './userInterface/screens/userScreen'; //import userScreen component

function App() {
  
  return (

    <Router>
      
      <Routes>

        <Route path="/" element={<PrivateScreenDash />} />
        <Route path="/add-room/*" element={<AddPrivateRoom />} />
        <Route path="/edit-room/*" element={<EditPrivateRoom />} />

        <Route path="/benefit-dash/*" element={<BenefitDashboard />} />


        <Route path="/user1/*" element={<UserScreen />} />
  
      </Routes>

    </Router>
  );
}

export default App;

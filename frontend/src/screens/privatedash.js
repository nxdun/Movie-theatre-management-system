import React, { useState } from 'react';   // import React and useState hook


//components
import PrivScreenList from '../components/PrivScreenList';
import SidePanel  from "../components/sidePanelBtns"; // import SidePanel component
//import SearchBar from '../components/SearchBar'; // import SearchBar component
//import PrivDataTable from '../components/privDataTable'; // import DataTable component
import Header from "../components/PrivHeader"; // import Header component
import { Router } from 'react-router-dom';


const DUMMY_PRIVSCREENS = [ // dummy data for private screening rooms
  {
    id: 'p1',
    privscname: 'Panoramic Screen 1',
    privseatcapacity: '10',
    privscdescription: 'Screen 1 is the largest screen in the cinema',
    privscprice: '5800.00',
    privsclocation: '2nd Floor, Left of the main entrance',
    imageUrl: 'https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g'
  
  },
  {
    id: 'p2',
    privscname: 'Screen 1',
    privseatcapacity: '100',
    privscdescription: 'Screen 1 is the largest screen in the cinema',
    privscprice: '£100',
    privsclocation: 'London',
    imageUrl: 'https://fastly.picsum.photos/id/85/1280/774.jpg?hmac=h_HHpvfhMmLP6uOSrHS7HSlXVRuMKfBbc8HFKd1Acv4'
  
  },
  

];



const PrivateDashboard = () => {
  return (

    
      <div>
          <Header />
          <PrivScreenList items={DUMMY_PRIVSCREENS}/>  

          <div>
           {/*<PrivDataTable /> */}
            <h2>Main Private screening dashboard</h2>
            <SidePanel />

          </div>
          



        <div>


         <h2>Main Private screening dashboard</h2>  


         </div>

        

         <div>

          
         </div>








      </div>

      
  )
};






export default PrivateDashboard; // export PrivateDash component





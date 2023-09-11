import React, { useState } from 'react';   // import React and useState hook


//components
import SidePanel  from '../components/sidePanelBtns'; // import SidePanel component
//import SearchBar from '../components/SearchBar'; // import SearchBar component
//import PrivDataTable from '../components/privDataTable'; // import DataTable component
import Header from '../components/Header'; // import Header component



const PrivateDashboard = () => {
  return (

    
      <div>
          <Header />

          <div>
           {/*<PrivDataTable /> */}
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





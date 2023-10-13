import React, { useState } from 'react';   // import React and useState hook

import PrivScreenList from './PrivScreenList';



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


const userScreen = () => {
    return (

        <div>

           <h2>User Screen</h2>
           <PrivScreenList items={DUMMY_PRIVSCREENS}/> 

        </div>
    )
};


export default userScreen;
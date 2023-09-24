import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SideDrawer from './components/SideDrawer';
import Backdrop from './components/Backdrop';
import { Outlet } from 'react-router-dom';

const RouteWrapper = () => {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <Outlet />
    </>
  );
};

export default RouteWrapper;

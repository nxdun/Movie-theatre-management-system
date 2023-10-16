import React from 'react';

import { Outlet } from 'react-router-dom';
import './ConcessionManagement.css';

export default function ConcessionManagement() {
  return <div className="ConcessionManagement"><Outlet /></div>;
}

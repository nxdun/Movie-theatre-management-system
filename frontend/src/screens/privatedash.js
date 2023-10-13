import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from '../components/PrivateScreens/UIelements/PrivHeader';
import PrivScreenList from '../components/PrivateScreens/PrivScreenList';
import SidePanel from '../components/PrivateScreens/UIelements/sidePanelBtns';
import './PrivateDashboard.css';


const PrivateDashboard = () => {
  const [loadedPrivateScreens, setLoadedPrivateScreens] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPrivateScreens, setFilteredPrivateScreens] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivateScreens = async () => {
      try {
        const response = await axios.get('/privatescreen/');
        setLoadedPrivateScreens(response.data.privatescreens);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrivateScreens();
  }, []);

  // Update filteredPrivateScreens when searchQuery changes
  useEffect(() => {
    const filteredScreens = loadedPrivateScreens.filter((screen) =>
      screen.privscname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPrivateScreens(filteredScreens);
  }, [searchQuery, loadedPrivateScreens]);



  const handleEditClick = (privScId) => {
    navigate(`/editprivatescreen/${privScId}`);
  };

  const handleDeleteClick = async (privScId) => {
    if (window.confirm("Are you sure you want to delete this private screen?")) {
      try {
        const response = await axios.delete(`/deleteprivatescreen/${privScId}`);
        if (response.status === 200) {
          // Refresh the list of private screens after deletion
          // You may fetch the updated list or use state to remove the deleted item
        } else {
          window.alert("Failed to delete the private screen. Please try again.");
        }
      } catch (err) {
        console.error(err);
        window.alert("An error occurred while deleting the private screen.");
      }
    }
  };
  

  return (
    <div>
      <Header />
      <div className="priv-search-container">
      <input
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="priv-search-input"
        />
      </div>
      <PrivScreenList
        items={filteredPrivateScreens} // Use filteredPrivateScreens instead of loadedPrivateScreens
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}

      />

      <div>
        <SidePanel />
      </div>
    </div>
  );
};

export default PrivateDashboard;

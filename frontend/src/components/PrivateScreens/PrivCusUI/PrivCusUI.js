import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./PrivCusHeader";
import UservScreenList from "./UserScreenList";
import "../../../screens/PrivateDashboard.css";

const PrivateCusScreen = () => {
  const [loadedPrivateScreens, setLoadedPrivateScreens] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPrivateScreens, setFilteredPrivateScreens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivateScreens = async () => {
      try {
        const response = await axios.get("/privatescreen/");
        setLoadedPrivateScreens(response.data.privatescreens);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrivateScreens();
  }, []);

  useEffect(() => {
    const filteredScreens = loadedPrivateScreens.filter((screen) =>
      screen.privscname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPrivateScreens(filteredScreens);
  }, [searchQuery, loadedPrivateScreens]);

  const handleBookNowClick = (privScreen) => {
    navigate(`/PrivScBooking/${privScreen._id}`);
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
      <UservScreenList
        items={filteredPrivateScreens}
        onBookNowClick={handleBookNowClick}
      />
    </div>
  );
};

export default PrivateCusScreen;

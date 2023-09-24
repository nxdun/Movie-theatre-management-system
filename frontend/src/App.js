import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import AddMovie from "./components/AddMovie";
import AllMovies from "./components/AllMovies";
import UpdateMovie from "./components/UpdateMovie";
import HomeMain from "./components/Home";
import DetailsM from "./components/Details";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/addMovie" exact element={<AddMovie />} /> {/*we write exact eod for only display path=/ for exact /*/}
          <Route path="/" exact element={<AllMovies />} />
          <Route path="/updateMovie/:userId" element={<UpdateMovie />} />
          <Route path="/Home" element={<HomeMain />} />
          <Route path="/Details" element={<DetailsM />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

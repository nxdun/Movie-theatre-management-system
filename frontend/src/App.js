import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SeatSelect from './pages/SeatSelect';
import Slip from './pages/Slip';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SeatSelect />} />
          <Route path="/Slip/:bookingId/:seatId/:theaterId/:price" element={<Slip />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
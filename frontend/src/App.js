import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SeatSelect from './pages/SeatSelect';
import Slip from './pages/Slip';
import SeatUpdate from './pages/SeatUpdate';
import SeatManage from './pages/SeatManage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SeatSelect />} />
          <Route path="/Slip/:seatId/:theaterId/:price" element={<Slip />} />
          <Route path="/SeatManage" element={<SeatManage />} />
          <Route path="/SeatUpdate/:bookingId/:seatId" element={<SeatUpdate />} />

          



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
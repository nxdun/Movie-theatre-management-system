import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages & components
import SeatSelect from './pages/SeatSelect';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<SeatSelect />} 
            />
          </Routes>
          </div>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;

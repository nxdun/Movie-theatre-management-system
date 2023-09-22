import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';

// screen
import Showtimes from './screens/Showtimes';

function App() {
  return (
    <Router>
    <main className="App">
      <Routes>
        <Route exact path="/" element={<Showtimes />} />
      </Routes>

    </main>
    </Router>
  );
}

export default App;

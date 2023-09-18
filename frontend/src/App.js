
import "./App.css";
import LoyalityDash from "./screens/LoyalityDash"
import CustomerRegisterForm from "./components/CustomerRegisterForm.js"
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";



function App() {

  return (
    <Router> {/* routeer */}
      <Switch> {/* stop redirect if path found */}
        <Route path="/loyality/dashboard" exact>
          <LoyalityDash  />
        </Route>
        <Route path="/register" exact>
          <CustomerRegisterForm />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;

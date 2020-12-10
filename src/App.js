
import './App.css';
import LangingPage from './Component/LandingPage/LangingPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFound from './Component/NotFound/NotFound';
import CarDetails from './Component/CarDetails/CarDetails';

function App() {
  return (

    <Router>
      <Switch>
        <Route path='/cardetails/:id'>
          <CarDetails />
        </Route>
        <Route exact path='/'>
          <LangingPage />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

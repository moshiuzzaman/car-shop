
import './App.css';
import LangingPage from './Component/LandingPage/LangingPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFound from './Component/NotFound/NotFound';
import AddCar from './Component/AddCar/AddCar';
import CarDetails from './Component/CarDetails/CarDetails';
import EditDetails from './Component/AddCar/EditDetails';
import NewAddedCarDetails from './Component/AddCar/NewAddedCarDetails';
import './App.css'

function App() {
  return (

    <Router>
      <Switch>
        <Route path='/cardetails/:id'>
          <CarDetails />
        </Route>
        <Route path='/addCar'>
          <AddCar/>
        </Route>
        <Route exact path='/'>
          <LangingPage />
        </Route>
        <Route path='/newAddedCar/:id'>
          <NewAddedCarDetails/>
        </Route>
        <Route path='/editDetails/:id'>
          <EditDetails/>
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

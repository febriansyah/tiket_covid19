import React from 'react';
import './App.css';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import AirlinePolicy from './pages/AirlinePolicy';
import AirportPolicyDomestic from './pages/AirportPolicyDomestic';
import AirportPolicyInternational from './pages/AirportPolicyInternational';
import TicketingPolicyFlights from './pages/TicketingPolicyFlights';
import Popup from './pages/Popup';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route path='/search-result' component = {SearchResult} />
          <Route path='/AirlinePolicy' component = {AirlinePolicy} />
          <Route path='/AirportPolicyDomestic' component = {AirportPolicyDomestic} />
          <Route path='/AirportPolicyInternational' component = {AirportPolicyInternational} />
          <Route path='/TicketingPolicyFlights' component = {TicketingPolicyFlights} />
        </Switch>
        <Popup />
      </Router>
    </div>
  );
}

export default App;

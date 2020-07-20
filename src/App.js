import React from 'react';
import './App.css';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import AirlinePolicyDomestic from './pages/AirlinePolicyDomestic';
import AirlinePolicyInternational from './pages/AirlinePolicyInternational';
import AirportPolicy from './pages/AirportPolicy';
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
          <Route path='/AirlinePolicyDomestic' component = {AirlinePolicyDomestic} />
          <Route path='/AirlinePolicyInternational' component = {AirlinePolicyInternational} />
          <Route path='/AirportPolicy' component = {AirportPolicy} />
          <Route path='/TicketingPolicyFlights' component = {TicketingPolicyFlights} />
        </Switch>
        <Popup />
      </Router>
    </div>
  );
}

export default App;

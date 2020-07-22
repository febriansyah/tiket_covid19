import React from 'react';
import './App.css';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import AirlinePolicyDomestic from './pages/AirlinePolicyDomestic';
import AirlinePolicyInternational from './pages/AirlinePolicyInternational';
import AirlinePolicyDetail from './pages/AirlinePolicyDetail';
import AirportPolicy from './pages/AirportPolicy';
import AirportPolicyDetail from './pages/AirportPolicyDetail';
import TicketingPolicyFlights from './pages/TicketingPolicyFlights';
import ScrollToTop from './pages/ScrollToTop';
import Popup from './pages/Popup';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 

function App() {
  return (
    <div>
      <Router>
      <ScrollToTop />
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route path='/SearchResult' component = {SearchResult} />
          <Route path='/AirlinePolicyDomestic' component = {AirlinePolicyDomestic} />
          <Route path='/AirlinePolicyInternational' component = {AirlinePolicyInternational} />
          <Route path='/AirlinePolicyDetail' component = {AirlinePolicyDetail} />
          <Route path='/AirportPolicy' component = {AirportPolicy} />
          <Route path='/AirportPolicyDetail' component = {AirportPolicyDetail} />
          <Route path='/TicketingPolicyFlights' component = {TicketingPolicyFlights} />
          <Route component={PageNotFound} />
        </Switch>
        <Popup />
      </Router>
    </div>
  );
}

function PageNotFound() {
  return (
    <div style={{width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <p>halaman tidak ditemukan</p>
    </div>
  )
}

export default App;

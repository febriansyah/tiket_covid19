import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import AirlinePolicy from './pages/AirlinePolicy';
import AirlinePolicyDetail from './pages/AirlinePolicyDetail';
import AirportPolicyDomestic from './pages/AirportPolicyDomestic';
import AirportPolicyInternational from './pages/AirportPolicyInternational';
import AirportPolicyDetail from './pages/AirportPolicyDetail';
import TicketingPolicyFlights from './pages/TicketingPolicyFlights';
import ScrollToTop from './pages/ScrollToTop';
import Popup from './pages/Popup';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 

function App() {
  const [selectedCountryCode, changeSelectedCountryCode] = useState('');
  //const [productshistory] = useState('');
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route path='/SearchResult/:countryCode' render = {(props) => <SearchResult {...props} changeSelectedCountryCode={(c) => changeSelectedCountryCode(c)} />} />
          <Route path='/AirlinePolicy' component = {AirlinePolicy} />
          <Route path='/AirlinePolicyDetail' component = {AirlinePolicyDetail} />
          <Route path='/AirportPolicyDomestic' component = {AirportPolicyDomestic} />
          <Route path='/AirportPolicyInternational' component = {AirportPolicyInternational} />
          <Route path='/AirportPolicyDetail' component = {AirportPolicyDetail} />
          <Route path='/TicketingPolicyFlights/:product' component = {TicketingPolicyFlights} />
         
          <Route component={PageNotFound} />
        </Switch>
        <Popup selectedCountryCode={selectedCountryCode} />
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

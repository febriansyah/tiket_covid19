import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import AirlinePolicy from './pages/AirlinePolicy';
import AirlinePolicyDetail from './pages/AirlinePolicyDetail';
import AirportPolicyDomestic from './pages/AirportPolicyDomestic';
import AirportPolicyInternational from './pages/AirportPolicyInternational';
import AirportPolicyDetail from './pages/AirportPolicyDetail';
import TicketingPolicy from './pages/TicketingPolicy';
import ScrollToTop from './pages/ScrollToTop';
import Popup from './pages/Popup';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 

function App() {
  const [selectedCountryCode, changeSelectedCountryCode] = useState('');
  const [selectedAirlaneCode, changeSelectedAirlaneCode] = useState('');
  const [selectedAirportCode, changeSelectedAirportCode] = useState('');
  
  //const [productshistory] = useState('');
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route path='/SearchResult/:countryCode/:kota?' render = {(props) => <SearchResult {...props} changeSelectedCountryCode={(c) => changeSelectedCountryCode(c)} />} />
          <Route path='/AirlinePolicy' component = {AirlinePolicy} />
          <Route path='/AirlinePolicyDetail/:airlaneCode' render = {(props) => <AirlinePolicyDetail {...props} changeSelectedAirlaneCode={(c) => changeSelectedAirlaneCode(c)} />} />
          <Route path='/AirportPolicyDomestic' component = {AirportPolicyDomestic} />
          <Route path='/AirportPolicyInternational' component = {AirportPolicyInternational} />
          <Route path='/AirportPolicyDetail/:airportCode' render = {(props) => <AirportPolicyDetail {...props} changeSelectedAirportCode={(c) => changeSelectedAirportCode(c)} />} />
          <Route path='/TicketingPolicy/:product' component = {TicketingPolicy} />
         
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

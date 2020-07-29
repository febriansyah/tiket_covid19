import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import AirlinePolicy from './pages/AirlinePolicy';
import AirlinePolicyInternational from './pages/AirlinePolicyInternational';
import AirlinePolicyDetail from './pages/AirlinePolicyDetail';
import AirportPolicy from './pages/AirportPolicy';
import AirportPolicyDetail from './pages/AirportPolicyDetail';
import TicketingPolicyFlights from './pages/TicketingPolicyFlights';
import ScrollToTop from './pages/ScrollToTop';
import Popup from './pages/Popup';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 

function App() {
  const [selectedCountryCode, changeSelectedCountryCode] = useState('');
  const [productshistory] = useState('');
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path='/' component = {Home} />
<<<<<<< HEAD
          <Route path='/SearchResult' render = {(props) => <SearchResult {...props} changeSelectedCountryCode={(c) => changeSelectedCountryCode(c)} />} />
          <Route path='/AirlinePolicy' component = {AirlinePolicy} />
=======
          <Route path='/SearchResult/:countryCode' render = {(props) => <SearchResult {...props} changeSelectedCountryCode={(c) => changeSelectedCountryCode(c)} />} />
          <Route path='/AirlinePolicyDomestic' component = {AirlinePolicyDomestic} />
          <Route path='/AirlinePolicyInternational' component = {AirlinePolicyInternational} />
>>>>>>> 364a80aa3f126cc9fb9c48e7c86f7b4ab6d9b76c
          <Route path='/AirlinePolicyDetail' component = {AirlinePolicyDetail} />
          <Route path='/AirportPolicy' component = {AirportPolicy} />
          <Route path='/AirportPolicyDetail' component = {AirportPolicyDetail} />
          <Route path='/TicketingPolicyFlights' component = {TicketingPolicyFlights} />
          <Route exact path="/TicketingPolicyFlights/:product" render={props =>
              <TicketingPolicyFlights  {...props} productshistory={(c) => productshistory(c)} />}
            />
          {/*<Route path='/TicketingPolicyFlights' component = {TicketingPolicyFlights} />*/}
         
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

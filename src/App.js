import React, { useState, Suspense, lazy } from 'react';
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

/*
const Home = lazy(() => import('./pages/Home'));
const SearchResult = lazy(() => import('./pages/SearchResult'));
const AirlinePolicy = lazy(() => import('./pages/AirlinePolicy'));
const AirlinePolicyDetail = lazy(() => import('./pages/AirlinePolicyDetail'));
const AirportPolicyDomestic = lazy(() => import('./pages/AirportPolicyDomestic'));
const AirportPolicyInternational = lazy(() => import('./pages/AirportPolicyInternational'));
const AirportPolicyDetail = lazy(() => import('./pages/AirportPolicyDetail'));
const TicketingPolicy = lazy(() => import('./pages/TicketingPolicy'));
const ScrollToTop = lazy(() => import('./pages/ScrollToTop'));
const Popup = lazy(() => import('./pages/Popup'));*/

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

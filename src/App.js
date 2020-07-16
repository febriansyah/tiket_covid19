import React from 'react';
import './App.css';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import AirlinePolicy from './pages/AirlinePolicy';
import Popup from './pages/Popup';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route path='/searchResult' component = {SearchResult} />
          <Route path='/AirlinePolicy' component = {AirlinePolicy} />
        </Switch>
        <Popup />
      </Router>
    </div>
  );
}

export default App;

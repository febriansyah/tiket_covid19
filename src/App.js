import React from 'react';
import './App.css';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route path='/searchResult' component = {SearchResult} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

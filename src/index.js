import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import 'antd-mobile/dist/antd-mobile.css';
//import './assets/css/style.css';
// import './assets/css/reset.css';
// import './assets/js/js_run.js';
// import './assets/js/js_lib.js';
// import './assets/js/jquery.infinitescroll.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

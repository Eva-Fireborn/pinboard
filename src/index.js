import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import openSocket from 'socket.io-client';
//const socket = openSocket('http://localhost:4000');  // connect to express server
//importera socket funktioner
//köra det man behöver
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

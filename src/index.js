import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import config from './aws-exports' // new
import Amplify from 'aws-amplify' // new
Amplify.configure(config) // new

ReactDOM.render(
  
    <Router>
      <App />
      </Router>,
    document.getElementById("root")
  );

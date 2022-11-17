import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import config from './aws-exports'
import App from './App';
import Amplify from 'aws-amplify'
Amplify.configure(config)
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
    <Router>
      <App />
      </Router>,
    document.getElementById("root")
  );

import { Row, Col, Alert } from "react-bootstrap";
import React, { Component } from "react";
import "./Home.css"
import { Link } from 'react-router-dom';

class Home extends Component {
  
  
  componentDidMount(){
    sessionStorage.setItem("userEmail", "")
  }
  render() {
    return (
      <div class="wrapper">
      <div class="neon-wrapper">
          <div class="txt">
          SHOWTIME DRIVEIN
          </div>
          <span class="gradient"></span>
          <span class="dodge"></span>
      </div>
  </div>

    );
  }
}

export default Home;

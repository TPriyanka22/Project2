import React, { Component } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./Home.css"
class Home extends Component {
  
  componentDidMount(){
    sessionStorage.setItem("userEmail", "")
  }
  render() {
    return (

      // <div>
      //   <Col xl={{ span: 6, offset: 3 }}>
      //     <Row style={{ display: "block" }}>
      //       <Alert variant="success" style={{ marginTop: "200px" }} className="text-center">
      //         <Alert.Heading>Welcome to ShowTime Drivein</Alert.Heading>
      //       </Alert>
      //     </Row>
      //   </Col>
      
      // </div>
     
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
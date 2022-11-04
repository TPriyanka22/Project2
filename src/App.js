import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron, Button, Card, Row, Col } from 'react-bootstrap';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Showtime ~ Drive-In</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <Routes />
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;

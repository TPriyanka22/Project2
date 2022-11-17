import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import Routes from "./Routes";
//import "./App.css";
import cognitoUtils from './Utilities/CognitoDetails'
const dotenv = require('dotenv');
const config = dotenv.config();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserLoggedIn: false,
      user: ""
    };
    
    console.log("printing in constructor app js",this.state.isUserLoggedIn)
  }

  componentDidMount(){
    let userEmail = sessionStorage.getItem("userEmail")
    let userName = sessionStorage.getItem("userName")
    this.setState({user:userName})
    console.log("printing in componentdid mout username",userName )
    console.log("printing in componentdidmount app js",this.state.user);
  }
  userHasLoggedIn = LoggedIn => {
    this.setState({ isUserLoggedIn: LoggedIn });
    console.log ("printing inside userHasLoggedIn func", this.state.userHasLoggedIn)
  }

  onLogOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
    sessionStorage.setItem("userEmail", "")
    sessionStorage.setItem("userName", "")
  }

  render() {

    const childProps = {
      isUserLoggedIn: this.state.isUserLoggedIn,
      userHasLoggedIn: this.userHasLoggedIn
    };
    console.log("printing in child ",this.state.isUserLoggedIn)
    const {user} = this.state
    return (
      <div >
        {
          //<Navbar fluid collapseOnSelect style={{backgroundColor: "#85c1e9"}}>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand as="h1">
              ShowTime Drivein
            </Navbar.Brand>
            <Navbar.Toggle />
            

          <Navbar.Collapse className="justify-content-end">
              <Navbar.Text style={{ fontSize: 18 }}>
                Signed in as: {user &&
                  <Link to="/UserBookings">{this.state.user}</Link>}
              </Navbar.Text>
              <Nav style={{ marginLeft:20}}>
                {
                  this.state.isUserLoggedIn
                    ? <Nav.Link onClick={this.onLogOut} style={{ fontSize: 18, color: "red" }}>Logout</Nav.Link>
                    : (<Nav.Link href={cognitoUtils.getCognitoSignInUri()} style={{ fontSize: 18, color: "green" }}>Log In</Nav.Link>)
                }

              </Nav>
            </Navbar.Collapse>
          </Navbar>}
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;

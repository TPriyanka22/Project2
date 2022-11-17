import Routes from "./Routes";
import cognitoUtils from './Utilities/CognitoDetails'
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
const dotenv = require('dotenv');
const config = dotenv.config();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      isUserLoggedIn: false
    };
    console.log("printing in constructor app js",this.state.isUserLoggedIn)
  }
  componentDidMount(){
    let userName = sessionStorage.getItem("userName")
    console.log("printing in componentdid mout username",userName )
    let userEmail = sessionStorage.getItem("userEmail")
    this.setState({user:userName})
    console.log("printing in componentdidmount app js",this.state.user);
  }
  userHasLoggedIn = LoggedIn => {
    console.log ("printing inside userHasLoggedIn func", this.state.userHasLoggedIn)
    this.setState({ isUserLoggedIn: LoggedIn });
    console.log ("printing inside userHasLoggedIn func", this.state.userHasLoggedIn)
  }

  onLogOut = (e) => {
    sessionStorage.setItem("userEmail", "")
    sessionStorage.setItem("userName", "")
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
    
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

          </Navbar>
         }
        <Routes childProps={childProps} />
      </div>
    );
  }
}
export default App;

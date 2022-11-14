import React, { PureComponent } from 'react'
import { Row, Col, Container, Card, Button, CardColumns, Alert } from "react-bootstrap";
import { ChatBot } from 'aws-amplify-react';
import Movies from './Movies';
import './UserView.css'
import { movieService } from '../../services/MovieService';

class UserView extends PureComponent {
    constructor(props) {
        super(props)
        this.file = null;
        this.state = {
            userName: "",
            userEmail: "",
            searchData: [],
        }

        
    }
    componentDidMount() {
        let userName = sessionStorage.getItem("userName");
        let userEmail = sessionStorage.getItem("userEmail");
        console.log("userName", userName, userEmail)
        this.setState({
            userEmail: userEmail,
            userName: userName
        })
        movieService.getAll()
            .then(json => {
                console.log(json);
                if (Array.isArray(json)) {
                    this.setState({
                        searchData: json,
                     
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }
   
    handleComplete(err, confirmation) {
        if (err) {
            alert('Bot conversation failed')
            return;
        }
        return 'Movie Slot booked. Thank you! What would you like to do next?';
    }
    handleFileChange = event => {
        this.file = event.target.files[0];
    }
    handleSubmit = async event => {
        event.preventDefault();
        this.s3fileupload();
    }
    
    render() {
        const { searchData } = this.state
        return (
            <div>

                <Container fluid>
                   
                    <Row style={{ marginTop: 10 }}>
                        <Col xl={7} style={{ border: "1px solid black", margin: 10, borderRadius: 5, marginLeft: 80, height: (window.innerHeight) - 205, overflowY: "scroll" }}>

                            <Alert variant="primary" style={{ marginTop: 10 }}>
                                <Alert.Heading>Movies</Alert.Heading>
                            </Alert>

                            <Row style={{ marginLeft: 35 }}>

                                {searchData && searchData.map(movieData => {
                                    return (
                                        <Col>
                                            <Movies movieData={movieData} key={movieData.movie_id}></Movies>
                                        </Col>
                                    )
                                })
                                }

                            </Row>
                        </Col>
                        <Col xl={4} >
                
                            <Row style={{ border: "1px solid black", margin: 10, borderRadius: 5 }}>
                                <Card style={{ width: "100%", height: (window.innerHeight/2)+62  }}>
                                    {/* <Alert variant="primary" style={{ margin: 10 }}>
                                        <Alert.Heading>ChatBot</Alert.Heading>
                                    </Alert> */}
                                    {/* <Card.Header as="h4">ChatBot</Card.Header> */}
                            <Card.Body >
                                        <ChatBot
                                            title="Movie Booking Chat Bot"
                                            botName= "BookTrip_dev"
                                            welcomeMessage="Welcome, how can I help you today?"
                                            onComplete={this.handleComplete.bind(this)}
                                            voiceEnabled={true}
                                            clearOnComplete={true}
                                        />
                                    </Card.Body>
                                </Card>
                            </Row>

                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default UserView

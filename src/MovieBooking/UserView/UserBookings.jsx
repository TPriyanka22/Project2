import React, { PureComponent } from 'react'
import { movieService } from '../../services/MovieService';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';

class UserBookings extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            userMovies: [],
            user: "",
        }
    }
    componentDidMount() {
        let userName = sessionStorage.getItem("userName");
        let userEmail = sessionStorage.getItem("userEmail");
        console.log("userName", userName, userEmail)
        this.setState({
            user: userEmail
        })
        movieService.getMovieBookingByUserID(userEmail)
            .then(json => {
                console.log(json);
                if (Array.isArray(json)) {
                    this.setState({
                        userMovies: json,
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }

    render() {
        const { userMovies } = this.state
        return (
            <div>
                
                <h2 className="text-center" style={{marginTop:10, marginRight:80}}>You have booked the following slots</h2>
                {userMovies && userMovies.map(movieData => {
                    return (
                        <Col xl={{ span: 3, offset: 4 }}>
                            
                            <Card style={{ width: '30rem', marginTop: 30, marginBottom: 30, paddingBottom: 20, paddingTop: 20 }}>

                                <Card.Body>
                                    <Card.Title>{movieData.MovieName.toUpperCase()}</Card.Title>
                                    <h6>On {movieData.BookingDate}</h6>
                                    <Card.Subtitle className="mb-2 text-muted"> @ {movieData.MovieLocation}</Card.Subtitle>
                                    <Card.Text>Number of tickets : {movieData.MovieSlots}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })
                }
            </div>
        )
    }
}

export default UserBookings
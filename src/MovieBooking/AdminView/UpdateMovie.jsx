import React, { PureComponent } from 'react'
import { Card, Form, Button, Col } from 'react-bootstrap'
import { movieService } from '../../services/MovieService'
import { Link } from 'react-router-dom';
import './AdminView.css';

class UpdateMovie extends PureComponent {
    constructor(props) {
        super(props)
        console.log("movie ID ", props.match.params.id);
        this.state = {
            movieId: props.match.params.id,
            name: "",
            releasedate: "",
            bookingdate: "",
            bookingtime: "",
            about: "",
            genre: "",
            movielength: "",
            location: "",
            userMovieData: {},
            city: "",
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateBookingDate = this.updateBookingDate.bind(this)
        this.updateBookingTime = this.updateBookingTime.bind(this)
        this.updateReleaseDate = this.updateReleaseDate.bind(this)
        this.updateAbout = this.updateAbout.bind(this)
        this.updateGenre = this.updateGenre.bind(this)
        this.updateMovielength = this.updateMovielength.bind(this)
        this.updateLocation = this.updateLocation.bind(this)
        this.updateCity = this.updateCity.bind(this)
    }

    componentDidMount() {
        movieService.getMovieByID(this.state.movieId).then(json => {
            console.log(json);
            if (!json.error) {
                this.setState({
                    userMovieData: json
                });
            }
            this.setState({
                name: this.state.userMovieData[0].movie_name,
                releasedate: this.state.userMovieData[0].release_date,
                bookingdate: this.state.userMovieData[0].booking_date,
                bookingtime: this.state.userMovieData[0].booking_time,
                about: this.state.userMovieData[0].about,
                genre: this.state.userMovieData[0].genre,
                movielength: this.state.userMovieData[0].movie_length,
                location: this.state.userMovieData[0].location,
                city: this.state.userMovieData[0].city

            })
            console.log("setstate",this)

        })
        .catch(reason => {
            console.log("Failed to fetch data from server, reason is : ", reason);
        });
    }
   
    onSubmit() {
        movieService.updateMovie(this.state.movieId, this.state.name, this.state.location, this.state.city, this.state.about, this.state.genre, this.state.releasedate,
            this.state.bookingdate, this.state.bookingtime, this.state.movielength)
            .then(json => {
                console.log(json);
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
            window.location.href='/AdminView'
    }
    updateName(event) {
        this.setState({
            name: event.target.value
        })
    }
    updateLocation(event) {
        this.setState({
            location: event.target.value
        })
    }
    updateReleaseDate(event) {
        this.setState({
            releasedate: event.target.value
        })
    }
    updateBookingDate(event) {
        this.setState({
            bookingdate: event.target.value
        })
    }
    updateBookingTime(event) {
        this.setState({
            bookingtime: event.target.value
        })
    }
    updateAbout(event) {
        this.setState({
            about: event.target.value
        })
    }
    updateGenre(event) {
        this.setState({
            genre: event.target.value
        })
    }
    updateMovielength(event) {
        this.setState({
            movielength: event.target.value
        })
    }
    updateCity(event) {
        this.setState({
            city: event.target.value
        })
    }

    render() {
        const { userMovieData } = this.state;
        return (
            <div>
            <div style={{ margin: "20px" }}>
                <h5 className='btn-new fifth'>
                    <Link to="/AdminView">Back</Link>
                </h5>
            </div>
            <Card className="form-container" style={{ "margin": 10, "width": "100%" }}>
                    <Card.Body style={{ "margin": 10, "width": "50%", margin: "0 auto" }}>
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Movie Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name of movie" value={this.state.name} onChange={this.updateName} />
                                <Form.Control.Feedback type="invalid">
                                    val.movie_name
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter Location" value={this.state.location} onChange={this.updateLocation} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid location.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="Enter City" value={this.state.city} onChange={this.updateCity} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formGridDate">
                                        <Form.Label>Release Date</Form.Label>
                                        <Form.Control placeholder="MM/DD/YYYY" value={this.state.releasedate} onChange={this.updateReleaseDate}/>
                            </Form.Group>
                            <Form.Row style={{ marginTop: "10px" }}>
                                    <Form.Group as={Col} controlId="formGridDate">
                                        <Form.Label>Booking Date</Form.Label>
                                        <Form.Control placeholder="MM/DD/YYYY" value={this.state.bookingdate} onChange={this.updateBookingDate}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridTime">
                                        <Form.Label>Booking Time</Form.Label>
                                        <Form.Control placeholder="eg. 22:00 hrs" value={this.state.bookingtime} onChange={this.updateBookingTime}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="about">
                                <Form.Label>About</Form.Label>
                                <Form.Control type="text" placeholder="Enter About" value={this.state.about} onChange={this.updateAbout} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid value.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="genre">
                                <Form.Label>Genre</Form.Label>
                                <Form.Control type="text" placeholder="Enter genre" value={this.state.genre} onChange={this.updateGenre} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="movielength">
                                <Form.Label>Movie length</Form.Label>
                                <Form.Control type="text" placeholder="Enter movielength" value={this.state.movielength} onChange={this.updateMovielength} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid postal code.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <div className="text-center">
                                <Button className="btn-new-button fifth" variant="custom" type="button" onClick={this.onSubmit}>
                                    Update
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default UpdateMovie
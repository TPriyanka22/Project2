import React, { PureComponent } from 'react'
import { Card, Form, Button, Col } from 'react-bootstrap'
import { movieService } from '../../services/MovieService'
import { Link } from 'react-router-dom';
import './AdminView.css';

class CreateMovie extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            location: "",
            releasedate: "",
            bookingdate: "",
            bookingtime: "",
            about: "",
            imagename: "",
            city: "",
            movielength: "",
            genre: [],
            files: [],
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateLocation = this.updateLocation.bind(this)
        this.updateBookingDate = this.updateBookingDate.bind(this)
        this.updateBookingTime = this.updateBookingTime.bind(this)
        this.updateReleaseDate = this.updateReleaseDate.bind(this)
        this.updateAbout = this.updateAbout.bind(this)
        this.updateGenre = this.updateGenre.bind(this)
        this.updateImagename = this.updateImagename.bind(this)
        this.updateCity = this.updateCity.bind(this)
        this.updateMovielength = this.updateMovielength.bind(this)
    }
    onSubmit() {
        
        let userEmail = sessionStorage.getItem("userEmail")
        if (this.state.files.length > 0) {
                
            movieService.createMovie(userEmail, this.state.name, this.state.about, this.state.genre, this.state.releasedate, this.state.bookingdate,
                    this.state.bookingtime, this.state.location, this.state.city, this.state.files[0], this.state.movielength)
                    .then(json => {
                        console.log(json);
                    })
                    .catch(reason => {
                        console.log("Failed to create data from server, reason is : ", reason);
                    });

        }
        setTimeout(function() {
            window.location.href='/AdminView'
       }, 2000);
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
    updateReleaseDate(event) {
        this.setState({
            releasedate: event.target.value
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
    updateCity(event) {
        this.setState({
            city: event.target.value
        })
    }
    updateImagename(event) {
        this.setState({
            imagename: event.target.value
        })
    }
    updateMovielength(event) {
        this.setState({
            movielength: event.target.value
        })
    }
    

    
    render() {
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
                                    Please provide a valid name.
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
                                        <Form.Label>Releasedate</Form.Label>
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
                            {/* <Form.Group controlId="genre">
                                <Form.Label>genre</Form.Label>
                                <Form.Control type="text" placeholder="Enter genre" value={this.state.genre} onChange={this.updateGenre} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                            </Form.Control.Feedback>
                            </Form.Group> */}
                            <Form.Group controlId="Test Genre">
                                <Form.Label>Genre</Form.Label>
                                    <Form.Control as="select" multiple onChange={e => {
                                    console.log(e.target.options);
                                    const opts = e.target.options;
                                    let tempArray = [];
                                    for (var i = 0; i < opts.length; i++) {
                                        var item = opts.item(i);
                                        console.log(item.selected, item.value);
                                        if (item.selected == true) {
                                            tempArray.push(item.value)
                                        }
                                    }
                                    this.setState({
                                        genre: tempArray
                                    })
                                }}>
                                    <option>Historical Picture</option>
                                    <option>Action/Adventure</option>
                                    <option>Drama</option>
                                    <option>Romance</option>
                                    <option>Sci-Fi Fiction</option>
          
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="movielength">
                                <Form.Label>Movie Length</Form.Label>
                                <Form.Control type="text" placeholder="Enter movielength" value={this.state.movielength} onChange={this.updateMovielength} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid postal code.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Card className='file-uploader'>
                                <Card.Body>
                                    <input type="file"  onChange={list => this.setState({
                                        files: list.target.files
                                    })}> 
                                    </input>
                                    &nbsp; &nbsp;
                                </Card.Body>
                                <span className='help-text' 
                                    // style={{
                                    //     backgroundColor: 'gray',
                                    //     color: 'black'
                                    // }}
                                > Upload Movie poster here:</span>
                            </Card>
                            <div className="text-center">
                                <Button className='btn-new-button fifth' variant="custom" type="button" onClick={this.onSubmit}>
                                        Submit
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default CreateMovie
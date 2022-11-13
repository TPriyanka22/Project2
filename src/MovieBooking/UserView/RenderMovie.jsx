import React, { PureComponent } from 'react'
import { Button, Card, Row, Col, Modal, Form } from 'react-bootstrap';
import { movieService } from '../../services/MovieService';
import { Link } from 'react-router-dom';

class RenderMovie extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            movieId: props.match.params.id,
            userName: "",
            userEmail: "",
            ticketCount: "2",
            movieData: [],
            castData: [],
            modalShow: false,
            uploadPhoto: false,
        }
        this.bookMovie = this.bookMovie.bind(this)
    }

    componentDidMount() {
        let userName = sessionStorage.getItem("userName");
        let userEmail = sessionStorage.getItem("userEmail");
        console.log("userName", userName, userEmail)
        this.setState({
            userName: userName,
            userEmail: userEmail
        })

       
    movieService.getMovieByID(this.state.movieId)
    .then(json => {
        
        if (Array.isArray(json)) {
            this.setState({
                movieData: json[0],
            
            });
            movieService.getCast(this.state.movieData.image_name).then(json => {
        console.log("Cast Details", json);
        if (Array.isArray(json)) {
            this.setState({
                castData: json[0],
            
            });
            

        }
        
    })
    .catch(reason => {
        console.log("Failed to fetch data from server, reason is : ", reason);
    });

        }
        
    })
    .catch(reason => {
        console.log("Failed to fetch data from server, reason is : ", reason);
    });

}
    setModalShow(value) {
        this.setState({
            modalShow: value
        })
    }

    bookMovie(tickets) {
        this.setState({
            ticketCount: tickets
        })

        
        movieService.createMovieBooking(this.state.movieId, this.state.movieData.movie_name, this.state.movieData.location, this.state.movieData.booking_date, this.state.ticketCount, this.state.userEmail)
           
            .then(json => {
                console.log("printing inside renderevent jsx of createmoviebooking method",json);
                    this.setState({
                       
                        uploadPhoto: true
                    });
                    console.log("printing the status of upload photo",this.state.uploadPhoto)
                    sessionStorage.setItem("BookedEventId", this.state.movieId)
                
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });


    }


    render() {
        const { movieData } = this.state
        const {castData} = this.state
        return (
            <div>
                <div style={{ margin: "30px" }}>
                    <Link to="/UserView"> Go Back</Link>
                </div>
                {
                    movieData && <div>
                        <Row style={{ display: "block" }}>
                            <Col xl={{ span: 6, offset: 3 }} style={{ marginTop: "30px" }}>
                                <Card style={{ marginTop: "20px" }} key={movieData.movie_id}>
                                   {/*  <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                                    <Card.Body>
                                        <h2>{movieData.movie_name && movieData.movie_name.toUpperCase()}</h2>
                                        <p>{movieData.about}</p>
                                        <p>Genre : {movieData.genre}</p>
                                        <h4><a style={{ color: "blue" }}>Location :</a> {movieData.location}</h4>
                                        <Card.Subtitle className="mb-2 text-muted">{movieData.location}</Card.Subtitle>
                                        <h6><a style={{ color: "red" }}>Date :</a> {movieData.release_date} &nbsp;&nbsp;<a style={{ color: "red" }}>Time :</a> {movieData.booking_time}</h6>
                                        <p>Cast : {castData.cast}</p>
                                    </Card.Body>

           

                                    <Card.Body>

                                        <Button variant="primary" size="lg" block onClick={(e) => this.setModalShow(true)}> Book </Button>
                                        <BookMovieModal
                                            show={this.state.modalShow}
                                            onHide={(e) => this.setModalShow(false)}
                                            onBookMovie={this.bookMovie}></BookMovieModal>
                                    </Card.Body>
                                   

                                </Card>
                            </Col>
                        </Row>
                    </div>
                }
            </div>


        )
    }
}

export default RenderMovie

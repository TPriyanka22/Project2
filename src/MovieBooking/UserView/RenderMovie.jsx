import React, { PureComponent } from 'react'
import { Button, Card, Row, Col, Modal, Form } from 'react-bootstrap';
import { movieService } from '../../services/MovieService';
import { bindActionCreators } from 'redux';
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

    /*setTicketText(value) {
        this.setState({
            ticketCount: value
        })
    }*/

    bookMovie(tickets) {
        this.setState({
            ticketCount: tickets
        })

        console.log("printing tickets",tickets);
        movieService.createMovieBooking(this.state.movieId, this.state.movieData.movie_name, this.state.movieData.location, this.state.movieData.booking_date, tickets, this.state.userEmail)
           
            .then(json => {
                console.log("printing inside renderevent jsx of createmoviebooking method",json);
                    this.setState({
                       
                        uploadPhoto: true
                    });
                    console.log("printing the status of upload photo",this.state.uploadPhoto)
                    sessionStorage.setItem("BookedEventId", this.state.movieId)
                    this.setModalShow(false)
                
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
                <div className="btn-new fifth" style={{ margin: "30px" }}>
                    <Link to="/UserView"> Go Back</Link>
                </div>
                {
                    movieData && <div>
                        <Row style={{ display: "block" }}>
                            <Col xl={{ span: 9}} style={{ margin: "0 auto" }}>
                                <Card style={{ marginTop: "20px" }} key={movieData.movie_id}>
                                   {/*  <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                                    <Card.Body>
                                        <img src={"https://stdrivein.s3.amazonaws.com/"+movieData.image_name} width = '100%' height = '45%' />
                                        <h5 style={{ marginTop: "10px" }}>{movieData.movie_name && movieData.movie_name.toUpperCase()}</h5>
                                        <p>{movieData.about}</p>
                                        <p><b>GENRE :</b> {movieData.genre}</p>
                                        {/* <h4><a style={{ color: "blue" }}>Location :</a> {movieData.location}</h4> */}
                                        <Card.Subtitle className="mb-2 text-muted">{movieData.location}</Card.Subtitle>
                                        <p><h6><a style={{ color: "red" }}><b>Date :</b></a> {movieData.release_date} &nbsp;&nbsp;<a style={{ color: "red" }}><b>Time :</b></a> {movieData.booking_time}</h6></p>
                                        <p><b>Cast :</b> {castData.cast}</p>
                                    </Card.Body>

           

                                    <Button style={{borderRadius:0}} variant="primary" size="lg" block onClick={(e) => this.setModalShow(true)}> Book </Button>
                                    <Card.Body>

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

export const BookMovieModal = ({ onBookMovie, ...props }) => {
    const [ticketText, setTicketText] = React.useState("");
    return (
      
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Book Slot
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*  <textarea style={{ width: "100%", height: "300px", padding: 20 }} value={reviewText} onChange={e => setReviewText(e.target.value)}> </textarea> */}
                <Form>
                    <Form.Group as={Row} controlId="formPlaintexttickets">
                        <Form.Label column sm="3">
                            Number of Slots :
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control placeholder="Slots" value={ticketText} onChange={e => setTicketText(e.target.value)} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={e => onBookMovie(ticketText)}>Book</Button>

            </Modal.Footer>
        </Modal>
    );
}
import React, { PureComponent } from 'react'
import {  Button, Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { movieService } from '../../services/MovieService';
import './AdminView.css';

class AdminView extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
           userMovieData: {},
            hasEvent: false,
            user: ""
        }
       this.getUserMovie = this.getUserMovie.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }
    componentDidMount() {
        let userEmail = sessionStorage.getItem("userEmail")
        console.log(userEmail)
        this.setState({
            user: userEmail
        })
       this.getUserMovie(userEmail)
    }
    
    getUserMovie(userEmail) {
        movieService.getMovieByUserID(userEmail)
            .then(json => {
                console.log(json);
                if (!json.error) {
                    this.setState({
                        userMovieData: json,
                        hasEvent: true
                    });
                } else {
                    this.setState({
                        hasEvent: false
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }
    onDelete(movie_id,image_name) {
        movieService.deleteMovie(this.state.user, movie_id)
            .then(json => {
                console.log(json);
              this.getUserMovie(this.state.user)
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
            movieService.deleteCast(image_name)
                .then(json => {
                    console.log(json);
                })
                .catch(reason => {
                    console.log("Failed to fetch data from server, reason is : ", reason);
                });
    }

    render() {
        const { hasEvent } = this.state;
        const { userMovieData } = this.state;
        return (
            <div>
                <Row style={{ display: "block" }}>
                    <Container fluid>
                        <Col xl={{ span: 12 }} style={{ padding: "15px", paddingLeft: "15px", paddingRight: "15px" }}>
                            {
                                !hasEvent &&
                                <div className="create-container text-center">
                                    <h5>You have not created any slots yet</h5>
                                    <h5 className="btn-new"> <Link to="/CreateMovie">Create a Slot</Link></h5>
                                </div>
                            }
                            {
                                hasEvent && <div>
                                    <div className="create-container text-center">
                                        <h5 className='btn-new fifth'> <Link to="/CreateMovie">Create a Slot</Link></h5>
                                    </div>
                                    <div className='card-container'>
                                        {
                                            userMovieData && userMovieData.map(value => {
                                                
                                                return (
                                                <div className="card" >
                                                    <p>{value.movie_name}</p>
                                                    
                                                    <div className="card-content">
                                                        <p>{value.location}</p>
                                                        <p>{value.genre}</p>
                                                        <p>{value.movie_length}</p>
                                                        <p className="text-right mini-buttons">
                                                            <Link to={`/UpdateMovie/${value.movie_id}`}><Button variant="outline-primary" style={{ marginLeft: "30px" }}>Update </Button></Link>
                                                            <Button variant="outline-danger" onClick={e=> this.onDelete(value.movie_id,value.image_name)}> Delete </Button>                                                    
                                                        </p>
                                                    </div>
                                                    <img src={"https://stdrivein.s3.amazonaws.com/"+value.image_name} width = '180' height = '180' />
                                                </div>
                                                )
                                            })
                                        }
                                    </div> 
                                </div>
                            }
                        </Col>
                    </Container>
                </Row>
            </div>
        )
    }
}

export default AdminView
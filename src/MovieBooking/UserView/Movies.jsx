import React, { PureComponent } from 'react'
import { Media, Card } from 'react-bootstrap'
import {  Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../AdminView/AdminView.css';

class Movies extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const eventURL = `/BookEvent/${this.props.movieData.movie_id}`
        return (
            <div className="card" >
                <p>{this.props.movieData.movie_name.toUpperCase()}</p>
                
                <div className="card-content">
                    <p>{this.props.movieData.location}</p>
                    <p>{this.props.movieData.state}</p>
                    <p>{this.props.movieData.movie_length}</p>
                    <p>{this.props.movieData.release_date}</p>
                    <p className="text-right mini-buttons">
                        <Link to={eventURL}><Button variant="outline-primary" style={{ marginLeft: "30px" }}>More Details </Button></Link>
                        {/* <Button variant="outline-danger" onClick={e=> this.onDelete(value.movie_id,value.image_name)}> Delete </Button>                                                     */}
                    </p>
                </div>
                <img src={"https://stdrivein.s3.amazonaws.com/"+this.props.movieData.image_name} width = '180' height = '180' />
            </div>
            // <Card style={{ width: '27rem', marginTop: 20, marginBottom: 20, paddingBottom:20, paddingTop:20}}>
            //     <Card.Body>
            //         <Card.Title>{this.props.movieData.movie_name.toUpperCase()}</Card.Title>
            //         <h6> {this.props.movieData.release_date} , {this.props.movieData.movie_length}</h6>
            //         <Card.Subtitle className="mb-2 text-muted"> @ {this.props.movieData.location}, {this.props.movieData.state}</Card.Subtitle>
            //         <Card.Link href="#">More Details</Card.Link>
            //         <img src={"https://stdrivein.s3.amazonaws.com/"+this.props.movieData.image_name} width = '180' height = '180' />
            //         <Link to={eventURL}>More Details</Link>
            //     </Card.Body>
            // </Card>

        )
    }
}

export default Movies
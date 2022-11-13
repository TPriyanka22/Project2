import React, { PureComponent } from 'react'
import { Media, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class Movies extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const eventURL = `/BookEvent/${this.props.movieData.movie_id}`
        return (

            <Card style={{ width: '27rem', marginTop: 20, marginBottom: 20, paddingBottom:20, paddingTop:20}}>
              
                <Card.Body>
                    <Card.Title>{this.props.movieData.movie_name.toUpperCase()}</Card.Title>
                    <h6> {this.props.movieData.release_date} , {this.props.movieData.movie_length}</h6>
                    <Card.Subtitle className="mb-2 text-muted"> @ {this.props.movieData.location}, {this.props.movieData.state}</Card.Subtitle>
                    {/* <Card.Link href="#">More Details</Card.Link> */}
                    <Link to={eventURL}>More Details</Link>
                </Card.Body>
            </Card>

        )
    }
}

export default Movies
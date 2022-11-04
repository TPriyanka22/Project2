import React, { PureComponent } from 'react'
import {  Button, Card, Row, Col } from 'react-bootstrap';
import '../App.css';
import { Link } from 'react-router-dom';

class CreateSlot extends PureComponent {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }

    render() {
        return (
            <div className='home-container'>
                <div className="row">
                    <div className="container-fluid text-left button-holder">
                        <button className='button'>
                            <Link to="/">
                                Back
                            </Link>
                        </button>
                    </div>
                    <div className="container-fluid">
                        <div className="register-container">
                            <p>Create Slot</p>
                            <form onSubmit={this.handleSubmit} >
                                <div className="form-group">
                                    <label for="movie">Movie</label>
                                    <input type="text" name="name" onChange={this.handleChange} className="form-control" id="movie" placeholder="Title" />
                                </div>
                                <div className="form-group">
                                    <label for="location">Location</label>
                                    <input type="text" name="name" onChange={this.handleChange} className="form-control" id="location" placeholder="Location" />
                                </div>
                                <div className="form-group">
                                    <label for="time">Time</label>
                                    <input type="text" name="name" onChange={this.handleChange} className="form-control" id="time" placeholder="Time" />
                                </div>
                                <div className="form-group multi">
                                    <label for="Categories">Genere</label>
                                    <select class="form-select" multiple aria-label="multiple select example">
                                        <option value="Horror">Horror</option>
                                        <option value="SciFi">SciFi</option>
                                        <option value="Action">Action</option>
                                        <option value="Animation">Animation</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label for="address">Address</label>
                                    <input name="address" type="name" onChange={this.handleChange} className="form-control" id="address" placeholder="Address" />
                                </div>
                                <div className="form-group">
                                    <label for="state">State</label>
                                    <input name="state" type="name" onChange={this.handleChange} className="form-control" id="state" placeholder="State" />
                                </div>
                                <div className="form-group">
                                    <label for="city">City</label>
                                    <input name="city" type="name" onChange={this.handleChange} className="form-control" id="city" placeholder="City" />
                                </div>
                                <div className="form-group">
                                    <label for="postal">Postal Code</label>
                                    <input name="postal" type="name" onChange={this.handleChange} className="form-control" id="postal" placeholder="Postal Code" />
                                </div>   
                                <input type="submit" value="Submit" className="btn btn-primary" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateSlot
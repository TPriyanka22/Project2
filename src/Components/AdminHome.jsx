import React, { PureComponent } from 'react'
import {  Button, Card, Row, Col } from 'react-bootstrap';
import '../App.css';
import { Link } from 'react-router-dom';

class AdminHome extends PureComponent {
    constructor(props) {
        super(props)

       
    }
    componentDidMount() {

    }

    render() {
        return (
            <div className='home-container'>
                <div className="row">
                    <div className="container-fluid">
                        <div className="register-container">
                            <p>Hello Drive-In Admin</p>
                            <p>
                                In order to engage with the events, Create the event here
                                <p className='button-holder pad-15'>
                                    <button className='button'>
                                        <Link to="/create-slot">
                                            Create Slot
                                        </Link>
                                    </button>
                                </p>
                            </p>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="card-container">
                            <div className="card card-1">
                                <p>THE WONDER </p>
                                <div className="card-content">
                                    <p>Cupertino, CA</p>
                                    <p>2hr 10mins</p>
                                    <p>Drama</p>
                                    <p className='text-right'><a href="/more">..More</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="card-container">
                            <div className="card card-2">
                                <p> TILL</p>
                                <div className="card-content">
                                    <p>Cupertino, CA</p>
                                    <p>Show timings: 10:00pm, 2:00pm, 6:00pm</p>
                                    <p className='text-right'><a href="/more">..More</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="card-container">
                            <div className="card card-1">
                                <p>BLACK ADAM</p>
                                <div className="card-content">
                                    <p>Cupertino, CA</p>
                                    <p>Show timings: 10:00pm, 2:00pm, 6:00pm</p>
                                    <p className='text-right'><a href="/more">..More</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="card-container">
                            <div className="card card-1">
                                <p>TICKET TO PARADISE </p>
                                <div className="card-content">
                                    <p>Cupertino, CA</p>
                                    <p>Show timings: 10:00pm, 2:00pm, 6:00pm</p>
                                    <p className='text-right'><a href="/more">..More</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminHome
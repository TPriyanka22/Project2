import React, { PureComponent } from 'react'
import {  Button, Card, Row, Col } from 'react-bootstrap';
import '../App.css';
import { Link } from 'react-router-dom';

class MorePage extends PureComponent {
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
                        <div className="page-content">
                            <h2>ABOUT:</h2>
                            <p>1862, 13 years after the Great Famine. An English Nightingale Nurse Lib Wright (Florence Pugh) is called to the Irish Midlands by a devout community to conduct a 15-day examination over one of their own. Anna O’Donnell (Kíla Lord Cassidy) is an 11-year-old girl who claims not to have eaten for four months, surviving miraculously on “manna from heaven”. As Anna's health rapidly deteriorates, Lib is determined to unearth the truth, challenging the faith of a community that would prefer to stay believing.
                            </p>
                            <p> <b>GENRE:</b> Drama</p>   
                            <p> <b>Release Date</b>: Wednesday, Nov 2 2022</p> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MorePage
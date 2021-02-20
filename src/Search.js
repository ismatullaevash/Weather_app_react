import {Col, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import React, {Component, useState } from "react";
import Weather from './Weather';
import LocalWeather from './LocalWeather';

export default class Search extends React.Component {
	constructor(props) {
        super(props);
        // Next we establish our state
        this.state = {
            city:"",
            error:""
        }
        // To use the 'this' keyword, we need to bind it to our function
        this.onChangeCity = this.onChangeCity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    // A custom function to change the name in our state to match the user input
    onChangeCity = (event) => {
        this.setState({
            city: event.target.value.toLowerCase()
        })
        this.city = false;
    }

    handleSubmit = (event) => {
    	event.preventDefault();
    	this.city = true;
    	this.forceUpdate();
    }

	render() {
		return(
			<div>
			<Form onSubmit={this.handleSubmit}>
			  <Form.Row className="form-row align-items-center">
			    <Col xs="auto">
			      <Form.Label htmlFor="city" srOnly>
			        City
			      </Form.Label>
			      <Form.Control
			        className=" form-control mb-2 "
			        id="city"
			        placeholder="Enter City..."
			        onChange={this.onChangeCity}
			      />
			    </Col>
			    <Col xs="auto">
			      <Button type="submit" className="mb-2">
			        Search
			      </Button>
			    </Col>
			  </Form.Row>
			</Form>
				{!this.state.city ? <LocalWeather /> : ''}
				{this.city && <Weather city={this.state.city} />}
			</div>
		);
	}
}

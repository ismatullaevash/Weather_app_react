import { Col, Form, Button } from 'react-bootstrap';
import React from "react";
import ApiWeather from './ApiWeather';
import Local from './Local';

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: ""
		}
		this.onSetCity = this.onSetCity.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	onSetCity = (event) => {
		this.setState({
			city: event.target.value.toLowerCase()
		})
		this.showResult = false;
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.showResult = true;
		this.forceUpdate();
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<Form.Row className="form-row align-items-center">
						<Col xs="auto">
							<Form.Label htmlFor="city" srOnly>
								City
			      </Form.Label>
							<Form.Control
								id="city"
								placeholder="Enter City"
								onChange={this.onSetCity}
							/>
						</Col>
						<Col xs="auto">
							<Button type="submit" className="mb-2" variant="dark">
								Search
			      </Button>
						</Col>
					</Form.Row>
				</Form>
				{/**if state city has data in it it will not render local weather, if it is empty local weather will be rendered */}
				{!this.state.city ? <Local recentlyViewed={this.props.recentlyViewed} pushHistory={this.props.pushHistory} /> : ''}
				{/**if city has data in it we render apiweather component passing city and props from parent component to further handle recentlyviewed  */}
				{this.showResult && <ApiWeather city={this.state.city} recentlyViewed={this.props.recentlyViewed} pushHistory={this.props.pushHistory} />}
			</div>
		);
	}
}

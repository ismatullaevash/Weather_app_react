import React, {Component, useState } from "react";
import {Link} from 'react-router-dom';

export default class Weather extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	cities: [],
        	isLoaded: false,
        	error: null
        }
    }

    componentDidMount() {
    	fetch(`https://api.openweathermap.org/data/2.5/find?q=${this.props.city}&cnt=50&units=metric&appid=6aeddd1327a38b779e2ceef5c87a5e57`)
    	.then(res => res.json())
	    	.then(json => {
	    		this.setState({
	    			isLoaded: true,
	    			cities: json.list,
	    		})
	    	}, (error) => {
	    		if (error) {
	    			this.setState({error:error})
	    		}
	    	})
    }
	render() {
		var {isLoaded, cities, error} = this.state;

		if (!isLoaded) {
			return <div>Loading...</div>
		}

		else if (!cities || cities.length == 0) {
			return <div>Awh Snap. Couldn't retreive data from the API <br/> {error}</div>
		}

		else {
			return (
				<div className="Weather">
					{console.log(cities)}
					<p>hey man here are the result...</p>
					{cities.map(city => (
						<div key={city.id}>
							<p><img src={"http://openweathermap.org/images/flags/" + city.sys.country.toLowerCase() + ".png"} alt="Flag" width="20" height="15"/> {city.name}, {city.sys.country}, <br/>
								Feels like {city.main.feels_like}&deg;C, {city.weather[0].description}.<br/>
								Current Temperate: {city.main.temp}&deg;C
							</p>
							<Link to={{
								pathname:`/FullDetails/${city.id}`, 
								city: city
							}}>

								<div className="plus"><b>+</b></div></Link>
							<hr/>
						</div>

					))}
				</div>
			);
		}
	}
}
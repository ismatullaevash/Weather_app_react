import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      isLoaded: false,
      error: null,
      currentPage: 1,
      citiesPerPage: 3
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
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
          this.setState({ error: error })
        }
      })
  }

  render() {
    var { isLoaded, cities, error, currentPage, citiesPerPage } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>
    }

    if (!cities || cities.length == 0) {
      return <div>Awh Snap. Couldn't retreive data from the API <br /> {error}</div>
    }

    const indexOfLastCity = currentPage * citiesPerPage;
    const indexOfFirstCity = indexOfLastCity - citiesPerPage;
    const currentcities = cities.slice(indexOfFirstCity, indexOfLastCity);

    const rendercities = currentcities.map((city, index) => {
      return (
        <div key={index}>
          <p><img src={"http://openweathermap.org/images/flags/" + city.sys.country.toLowerCase() + ".png"} alt="Flag" width="20" height="15" /> {city.name}, {city.sys.country}, <br />
            Feels like {city.main.feels_like}&deg;C, {city.weather[0].description}.<br />
            Current Temperate: {city.main.temp}&deg;C
          </p>
          <Link to={{
            pathname: `/FullDetails/${city.id}`,
            city: city
          }}>
            <button>
              see more details</button></Link>
          <hr />
        </div>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cities.length / citiesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick} >
          {number}
        </li>
      );
    });

    return (
      <div className="Weather">
        {rendercities}
        <div id="page-numbers">
          {renderPageNumbers}
        </div>
      </div>
    );
  }
}
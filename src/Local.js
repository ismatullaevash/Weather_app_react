import React from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class LocalWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: [],
      lat: "",
      lon: "",
      isEnabledLocation: false,
      isLoaded: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        isEnabledLocation: true
      })

    }, (error) => {
      console.log(error);
    }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lat !== this.state.lat) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&appid=2bc51b08af681b26d54eb53c3ea3b635`)
        .then(res => res.json())
        .then(city => {
          this.setState({
            isLoaded: true,
            city: city,
          })
        }, (error) => {
          if (error) {
            console.log(error);
          }
        })
    }
  }
  handleClick(e, city) {
    e.preventDefault();
    this.props.pushHistory(city);

  }
  render() {

    var { isLoaded, city, isEnabledLocation: isEnabledLocation } = this.state;

    if (!isEnabledLocation) {
      return <div><Alert variant="danger">
        Please enable location to get local weather
  </Alert></div>
    }

    if (!isLoaded) {
      return <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    }

    else if (!city || city.length == 0) {
      return <div><Alert variant="danger">
        Ooopsie, something went wrong with API request!
  </Alert> </div>
    }

    else {
      return (
        <div >
          <div key={city.id}>
            <p><b><img src={"http://openweathermap.org/images/flags/" + city.sys.country.toLowerCase() + ".png"} alt="Flag" width="30" height="20" /> {city.name}, {city.sys.country}</b>, <br />
            Feels like {city.main.feels_like}&deg;C, {city.weather[0].description}.<br />
              <p style={{ color: 'red', fontSize: 20 }}><img src={"https://openweathermap.org/img/w/" + city.weather[0].icon + ".png"} alt="Flag" width="70" height="70" /> {city.main.temp}&deg;C</p>
            </p>
            <Button onClick={e => this.handleClick(e, city)} variant="outline-dark">
              <Link to={{
                pathname: `/Popup/${city.id}`,
                city: city
              }}> Click to see more</Link></Button>
            <hr />
          </div>
        </div>
      );
    }
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';


export default class LocalWeather extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          city: [],
          lat: "",
          lon: "",
          isLoaded: false,
          permission: false,
          error: null
        }
    }

  componentDidMount() { 
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        lat:pos.coords.latitude,
        lon:pos.coords.longitude,
        permission:true})

      }, (error) => {
        this.setState({
          error:error
        })
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lat !== this.state.lat) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&appid=6aeddd1327a38b779e2ceef5c87a5e57`)
        .then(res => res.json())
          .then(city => {
            this.setState({
              isLoaded: true,
              city: city,
            })
          }, (error) => {
            if (error) {
              this.setState({error:error})
            }
        })
    }
  }

  render() {
    
    var {isLoaded, city, error, permission} = this.state;

    if (!permission) {
      return <div>Try enabling location to get local weather</div>
    }
    
    if (!isLoaded) {
      return <div>Loading...</div>
    }

    else if (!city || city.length == 0) {
      return <div>Couldn't display local weather. <br/> {error}</div>
    }

    else {
      return (
        <div className="LocalWeather">
        <div key={city.id}>
          <p><img src={"http://openweathermap.org/images/flags/" + city.sys.country.toLowerCase() + ".png"} alt="Flag" width="20" height="15"/> {city.name}, {city.sys.country}, <br/>
            Feels like {city.main.feels_like}&deg;C, {city.weather[0].description}.<br/>
            Current Temperate: {city.main.temp}&deg;C
          </p>
          <Link to={{
            pathname:`/FullDetails/${city.id}`, 
            city: city
          }}>
          <button>
              see more details</button></Link>
          <hr/>
        </div>
        </div>
      );
    }
  }
}

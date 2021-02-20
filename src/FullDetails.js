import {useParams} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {Link} from 'react-router-dom';

const FullDetails = () => {
	const {id} = useParams();
	const location = useLocation();
	const city = location.city;
	console.log(city)

	return (
		<div className="result">
			<div className="center">
			<h4><img src={"http://openweathermap.org/images/flags/" + city.sys.country.toLowerCase() + ".png"} alt="Flag" width="20" height="15"/>  
			{city.name}, {city.sys.country}</h4><br/>
			</div>
			<hr/>
			<p>
			<b>Feels like: </b> {city.main.feels_like}&deg;C<br/>
			<b>Current Temperate: </b>{city.main.temp}&deg;C <br/>
			<b>Expected temperature from</b> {city.main.temp_min}&deg;C to {city.main.temp_max}&deg;C<br/>
			<b>Clouds: </b>{city.weather[0].description} <b>Humidity: </b>{city.main.humidity}% <b>Pressure: </b>{city.main.pressure} hPa<br/>
			<b>Wind: </b>{city.wind.speed} m/s <br/>
			<b>Geo Location: </b> {city.coord.lat}, {city.coord.lon}
			</p>
			<hr/>
			<Link to={{
            pathname:"/"
           
          }}>
          <button>
              go back to home</button></Link>
		</div>
	);
}

export default FullDetails;
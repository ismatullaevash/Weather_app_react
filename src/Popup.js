import { useLocation} from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Popup = () => {
	const location = useLocation();
	const city = location.city;
	console.log(location);
	return (
		<div>

			<div>
				<p><b><img src={"http://openweathermap.org/images/flags/" + city.sys.country.toLowerCase() + ".png"}  width="30" height="20"/> {city.name}, {city.sys.country}</b>, <br />
            Feels like {city.main.feels_like}&deg;C, {city.weather[0].description}.<br />
					<img src={"https://openweathermap.org/img/w/" + city.weather[0].icon + ".png"}  width="70" height="70" /> {city.main.temp}&deg;C
          </p>
			</div>
			<p>
				<b>Expect weather from</b> {city.main.temp_min}&deg;C <b>to</b> {city.main.temp_max}&deg;C<br />
				<b>Clouds: </b>{city.weather[0].description} <b>Humidity: </b>{city.main.humidity}% <b>Pressure: </b>{city.main.pressure} hPa<br />
				<b>Wind: </b>{city.wind.speed} m/s <br />
				<b>Geo Location: </b>[ {city.coord.lat}, {city.coord.lon}]
			</p>
			<hr />
			<Link to={{
				pathname: "/"

			}}>
				<Button variant="outline-dark">
					Home page</Button></Link>

		</div>
	);
}

export default Popup;
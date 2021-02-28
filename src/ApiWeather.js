import React from "react";
import { Link} from 'react-router-dom';
import { Button, Spinner, Alert } from 'react-bootstrap';
import ReactPaginate from "react-paginate";
export default class ApiWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: [],
      isLoaded: false,
      currPage: 0,
      numPerPage: 3
    };
    this.handleExpand = this.handleExpand.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.openweathermap.org/data/2.5/find?q=${this.props.city}&cnt=50&units=metric&appid=2bc51b08af681b26d54eb53c3ea3b635`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          cityList: json.list,
        })
      }, (error) => {
        if (error) {
          console.log(error);
        }
      })
  }
  /* getDerivedStateFromProps is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or null to update nothing.
This method exists for rare use cases where the state depends on changes in props over time. For example, it might be handy for implementing a <Transition> component that compares its previous and next children to decide which of them to animate in and out.*/
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isNaN(nextProps.city)) {
      for (var i in nextProps.recentlyViewed) {
        if (String(nextProps.recentlyViewed[i].id) === nextProps.city) {
          var temp = [];
          temp.push(nextProps.recentlyViewed[i]);
          return (
            {
              cityList: temp,
              isLoaded: true
            })
        }
      }
    }
  }
 
  //in this method i call function from parent to unshift city onto array
  handleExpand(e, city) {
    e.preventDefault();
    this.props.pushHistory(city);

  }
  
  render() {
    var { isLoaded, cityList: cityList,currPage: currPage, numPerPage: numPerPage } = this.state;
{/* if element is still loading it plays animation that i retrieved from react bootstrap*/}
    if (!isLoaded) {
      return <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    }
{/* if the user did not input any city OR inputted city which is invalid an error message will be rendered on screen*/}
    if (!cityList || cityList.length == 0) {
      return <div><Alert variant="danger">
        Ooopsie, something went wrong with API request!
    </Alert></div>
    }

    const lastCity = currPage * numPerPage;
    const firstCity = lastCity + numPerPage;
    const currcities = cityList.slice(lastCity, firstCity).map((item, index) => {
      return (
        <div key={index}>
          <p><b><img src={"http://openweathermap.org/images/flags/" + item.sys.country.toLowerCase() + ".png"} alt="Flag" width="30" height="20" /> {item.name}, {item.sys.country}</b>, <br />
            Feels like {item.main.feels_like}&deg;C, {item.weather[0].description}.<br />
            <img src={"https://openweathermap.org/img/w/" + item.weather[0].icon + ".png"} alt="Flag" width="70" height="70" /> {item.main.temp}&deg;C
          </p>

          <Button id={index} onClick={e => this.handleExpand(e, item)} variant="outline-dark">
            {/* i used new hooks function to send state of city and open new page(path) with detaild information  */}
            <Link to={{
              pathname: `/Popup/${item.id}`,
              city: item
            }}> Click to see more</Link></Button>
          <hr />
        </div>
      );
    });

    const nPages = Math.ceil(cityList.length / numPerPage);

    const onChange = ({selected}) => {
      this.setState({
        currPage: selected
      })
    }

    return (
      <div>
        {currcities}
        <div>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={nPages}
          onPageChange={onChange}
          containerClassName={"paginationButtons"}
        />
        </div>
      </div>
    );
  }
}
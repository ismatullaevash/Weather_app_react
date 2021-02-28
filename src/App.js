import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import ApiWeather from "./ApiWeather";
import Homepage from "./Homepage";
import Local from "./Local";
import './appCSS.css';
import Popup from "./Popup";
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyViewed: []
    }
    this.pushHistory = this.pushHistory.bind(this);

  }
//this function is meant to store visited cities history
  pushHistory(weather) {
    var temp = this.state.recentlyViewed;
// unshift() method adds new items to the beginning of an array, and returns the new length.This method changes the length of an array.
    temp.unshift(weather);

    for (let i = 1; i < temp.length; i++) {
      //if the same city was added to list twice, i get rid of it
      if (temp[i] == temp[0]) {
        temp.splice(i, 1);
      }
    }
    //after manipulations on temp i set recently viewed to modified temp
    this.setState({
      recentlyViewed: temp
    })

  }

  render() {
    return (
      <BrowserRouter>
        <Navbar bg="dark" expand="lg" variant="dark">
          {/* Pressing on Shakha's app takes user back to home */}
          <Navbar.Brand to="/"><Link to={"/"}>Shakha's App</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* created a nav link that takes to local weather */}
              <Nav.Link><Link to={"/LocalDetails"}>Local Weather</Link></Nav.Link>
              <NavDropdown title="Visited Cities" id="basic-nav-dropdown">
                {/* check if array if empty,
                if it has data in it i map through array and create dropdown.items that link to path: /city/:id
                if it is empty i create a dropdown item which says nothing to show */}
                {this.state.recentlyViewed.length > 0 ?
                  this.state.recentlyViewed.map((id, index) => (
                    <LinkContainer to={`/city/${id.id}`} key={index}>
                      <Dropdown.Item>
                        {id.name} {id.sys.country}
                      </Dropdown.Item>
                    </LinkContainer>
                  )) :
                  <Dropdown.Item>
                    Nothing to show
                  </Dropdown.Item>
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <div className="content">
            <div className="row justify-content-center">
              <Switch>
                {/*  i pass down states of parent to children so that i can modify state in there*/}
                <Route exact path="/">
                  <Homepage recentlyViewed={this.state.recentlyViewed} pushHistory={this.pushHistory} />
                </Route>

                <Route exact path="/LocalDetails">
                  <Local recentlyViewed={this.state.recentlyViewed} pushHistory={this.pushHistory} />
                </Route>
                <Route path="/Popup/:id">
                  <Popup />
                </Route>
                {/* This is the route where i render visited cities, as it can be seen i call my weather component for it to show info on the city pressed*/}
                <Route path='/city/:id' render={(props) => (
                  <ApiWeather city={props.match.params.id} recentlyViewed={this.state.recentlyViewed} pushHistory={this.pushHistory} />
                )} />
                <Route render={() => (
                  <h1>Not Found</h1>
                )} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }

}
export default App;

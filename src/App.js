import Navigation from './Navigation.js';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFound from './NotFound.js';
import Weather from './Weather.js';
import Search from './Search.js';
import FullDetails from './FullDetails';
import LocalWeather from './LocalWeather';
import './style.css';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation />
        <div className="container">
          <div className="content">
            <div className="row justify-content-center">
              <Switch>
                <Route exact path="/">
                  <Search />
                </Route>
                <Route path="/FullDetails/:id">
                  <FullDetails />
                </Route>
                <Route path="*">
                  <NotFound/>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

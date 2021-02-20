import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, LinkContainer, recentlyViewed, FormGroup, FormControl, updateSearchId, searchId } from 'react'; 
import { Navbar, Nav, NavItem, NavDropdown, DropdownButton, Dropdown, } from 'react-bootstrap'

const Navigation = () => {

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Brand href="/">Shakhzoda's Weather App</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
			<Nav className="mr-auto">
			  <NavDropdown title="Visited Cities" id="collasible-nav-dropdown">
			    <NavDropdown.Item href="/">Local Weather</NavDropdown.Item>
			    <NavDropdown.Item href="#action/3.2">Visited Cities</NavDropdown.Item>
			    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
			    <NavDropdown.Divider />
			    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
			  </NavDropdown>
			</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Navigation;
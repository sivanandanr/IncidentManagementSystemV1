import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import logo from '../assets/logo.png';

export default class Sidebar extends Component {
	render() {
		return(
			<nav className="col-md-2 d-none d-md-block bg-light sidebar">
	  			<center></center>
	    		<ul className="nav flex-column">
	    			<li className="nav-item">
	    				<NavLink to="/" className="nav-link" activeClassName="active">
	    					<i className="fas fa-home"></i>
	    					Dashboard Home
	    				</NavLink>
	    			</li>
	    			<li>
                		<NavLink to="/incidents/create" className="nav-link" activeClassName="active">
                			<i className="fas fa-ticket-alt"></i>
                			Submit a Incident
                		</NavLink>
            		</li>
            		<li>
                		<NavLink to="/manage-users" className="nav-link" activeClassName="active">
                			<i className="fas fa-users"></i>
                			Manage Users
                		</NavLink>
            		</li>
            		<li>
                		<NavLink to="/manage-projects" className="nav-link" activeClassName="active">
                			<i className="fas fa-folder"></i>
                			Manage Projects
                		</NavLink>
            		</li>
	    		</ul>
			</nav>
		);
	}
}

import React, { Component } from 'react';
import{logout} from './security/services/authentication';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			globalLogout: this.props.globalLogout
		};
	}
	
	globalLogout(){
		this.props.globalLogout();
		logout();
	}
    render() {
		
        return (
            <nav className="navbar navbar-light bg-light navbar-expand-lg ml-auto">
            	<div className="container-fluid">
	            	<button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-align-justify"></i>
	                </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
		                <ul className="navbar-nav ml-auto">  
		                	<li>        
		                    	<Link to="/login" className="nav-link" style={{display: this.props.isLoggedIn? 'none':'inline'}}>Log In</Link>
		                    </li>
		                    <li>
		                    	<input type="button" onClick={this.globalLogout.bind(this)} className="nav-link" value="Signout" style={{display: this.props.isLoggedIn  ? 'inline':'none'}} />
		                    </li>
		                </ul>
	                </div>
                </div>
            </nav>
        );
    }
}

import React, { Component } from 'react';
import axios from 'axios';
import Incident from './incident-display';

export default class IncidentList extends Component {
	constructor(props) {
		super(props);

		this.deleteIncident = this.deleteIncident.bind(this);

		this.state = { incidents: [] };
	}

    componentDidMount() {
        axios.get('http://localhost:3000/incidents/')
            .then(res => {
                this.setState({ incidents: res.data })
            })
            .catch(error => console.log(error));
    }

    deleteIncident(id) {
	    axios.delete('http://localhost:3000/incidents/'+id)
	        .then(res => { console.log(res.data)});

	    // update incidents array to all incidents without matching id
	    this.setState({
	        incidents: this.state.incidents.filter(el => el._id !== id)
	    })
	}

	getAllList() {
        return this.state.incidents.map(currentIncident => {
            
                return <Incident 
            			incident={currentIncident} 
            			deleteIncident={this.deleteIncident}
                        key={currentIncident._id}
                        />;
        })
	}

    

	render() {
		return(
            
            <div className="card">
            <div className="card-header"><h3>Incidents</h3></div>
            <div className="card-body">
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Project</th>
                    <th>Assigned To</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    { this.getAllList() }
                </tbody>
            </table>
            </div>
        </div>
		);
	}
}
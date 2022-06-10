import React, { Component } from 'react';
import axios from 'axios';
import Incident from './incident-display';
import ReactPaginate from 'react-paginate';
export default class IncidentList extends Component {
	constructor(props) {
		super(props);

		this.deleteIncident = this.deleteIncident.bind(this);

		this.state = {
            offset: 0,
            incidents: [],
            perPage: 3,
            currentPage: 0,
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
	}

    componentDidMount() {
        this.getAllIncidents();
    }
    getAllIncidents(){
        axios.get(`http://localhost:3000/incidents/getAll?size=`+this.state.perPage+`&page=`+this.state.currentPage)
            .then(res => {
                const data = res.data;
                this.setState({
                    pageCount: Math.ceil(data.totalPagedItem / this.state.perPage),
                    incidents: data.incidents
                });
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

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getAllIncidents()
        });

    };


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
                <tr>
                    <td colSpan='8'>
                    <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    </td>
                </tr>
            </table>
            </div>
        </div>
		);
	}
}
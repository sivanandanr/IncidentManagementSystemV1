import React, { Component } from 'react';
import IncidentDataService from './services/incident-services';
import{getAuthState,isLoggedin} from '../security/services/authentication';
import Incident from './incident-display';
import ReactPaginate from 'react-paginate';
import * as myConstClass  from '../../const/constant';
const roles = myConstClass.roles;

export default class IncidentList extends Component {
	constructor(props) {
		super(props);
        this.role = getAuthState().role;
        this.name = getAuthState().name;
        this.isLogin = isLoggedin;
        this.isAdmin = this.role == "Admin";
		this.deleteIncident = this.deleteIncident.bind(this);
        
		this.state = {
            offset: 0,
            incidents: [],
            perPage: 3,
            currentPage: 0,
            totalitem: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
	}

    componentDidMount() {
        if(this.role === "Admin"){
            this.getAllIncidents();
        }else{
            this.getMyIncidents();
        }
    }
    
    getAllIncidents(){
        IncidentDataService.getAllPagedIncident(this.state.perPage,this.state.currentPage)
            .then(res => {
                const data = res.data;
                this.setState({
                    pageCount: Math.ceil(data.totalPagedItem / this.state.perPage),
                    incidents: data.incidents,
                    totalitem: data.totalPagedItem
                });
            })
            .catch(error => console.log(error));
    }
    getMyIncidents(){
        
        IncidentDataService.getMyAllPagedIncident(this.state.perPage,this.state.currentPage,this.name)
            .then(res => {
                const data = res.data;
                this.setState({
                    pageCount: Math.ceil(data.totalPagedItem / this.state.perPage),
                    incidents: data.incidents,
                    totalitem: data.totalPagedItem
                });
            })
            .catch(error => console.log(error));
    }
    deleteIncident(id) {
	    IncidentDataService.delete(id)
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
                        isAdmin={this.isAdmin}
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
            if(this.role == "Admin"){
                this.getAllIncidents();
            }else{
                this.getMyIncidents();
            }
        });

    };
    

	render() {
        const show = this.role === "Admin";
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
                    { this.getAllList(show) }
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

                    <b style={{float:'right'}}>Total records:<b>{this.state.totalitem}</b></b>
                    </td>
                    

                </tr>
            </table>
            </div>
        </div>
		);
	}
}
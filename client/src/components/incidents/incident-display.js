import React, { Component } from 'react';
import IncidentDataService  from './services/incident-services';
import { Link } from 'react-router-dom';
import MarkButton from '../mark-button';

let getPriorities = (lvl) => {
    switch(lvl) {
        case 'Low': 
            return <td className="low-priority">{lvl}</td>;
        case 'Medium':
            return <td className="med-priority">{lvl}</td>;
        case 'High': 
            return <td className="high-priority">{lvl}</td>;
        default:
            return <td>{lvl}</td>;
    }
}

export default class Incident extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            status: ''
        }
    }

    componentDidMount() {
        // default state of Incident
        IncidentDataService.get(this.props.incident._id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    projectName: res.data.projectName,
                    assignee: res.data.assignee,
                    priority: res.data.priority,
                    status: res.data.status,
                    type: res.data.type
                })
            })
            .catch(error => console.log(error));
    }

    onChangeStatus(e) {
       
    }

    render() {
        return (
            <tr>
                <td>{this.props.incident.title}</td>
                <td>{this.props.incident.description}</td>
                <td>{this.props.incident.projectName}</td>
                <td>{this.props.incident.assignee}</td>
                { getPriorities(this.props.incident.priority) }
                <td>{this.props.incident.status}</td>
                <td>{this.props.incident.type}</td>
                <td >
                    <Link to={"/edit/"+this.props.incident._id} className="btn btn-primary" style={{display: this.props.isAdmin ? 'inline':'none'}}><i className="fas fa-edit" title='Edit' ></i>Edit</Link>
                    &nbsp;
                    <a href="#" className="btn btn-danger" onClick={() => { 
                        if(window.confirm('Are you sure you want to delete this incident?')) 
                            this.props.deleteIncident(this.props.incident._id) 
                    }} 
                    title='delete' style={{display: this.props.isAdmin ? 'inline':'none'}}><i className="fa fa-trash"></i>Delete</a>
                    &nbsp;
                    
                    <MarkButton 
                        mark={this.props.incident.status} 
                        incidentID={this.props.incident._id}
                    />
                    {   /* *****
                        *  FIX THIS TO UPDATE STATE
                        * *****/
                        // this.props.incident.status !== 'Resolved' ? 
                        // <a href="#" onClick={() => {
                        //     this.props.incident.status = 'Resolved' 
                        // }} 
                        // className="badge badge-success">Mark as Resolved</a> :
                        // <a href="#" onClick={() => {
                        //     this.props.incident.status = 'Open' 
                        // }} 
                        // className="badge badge-secondary">Mark as Open</a>
                    }
                </td>
            </tr>
        );
    }
}
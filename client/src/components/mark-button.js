import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const notify = (a) => toast(a);
export default class MarkButton extends React.Component {
	constructor(props) {
		super(props);

        this.handleClick = this.handleClick.bind(this);

		this.state = { 
            title: '',
            description: '',
            projectName: '',
            assignee: '',
            priority: '',
            status: '',
            type: '',
            users: [],
            projects: []
        };
	}

	componentDidMount() {
        // default state of incident
        axios.get('http://localhost:3000/incidents/'+this.props._id)
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
            .catch((error) => { console.log(error); })

        // get list of users to select from
        axios.get('http://localhost:3000/users/')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.name)
                })
            }
        })
        .catch((error) => { console.log(error); })

        // get list of projects to select from
        axios.get('http://localhost:3000/projects/')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    projects: res.data.map(project => project.name)
                })
            }
        })
        .catch((error) => { console.log(error); })
    }

    handleClick(e) {
        e.preventDefault();

        this.state.status !== 'Resolved' ?
        this.setState({status: 'Resolved'}) : 
        this.setState({status: 'Open'})

        const incident = {
            title: this.state.title,
            description: this.state.description,
            projectName: this.state.projectName,
            assignee: this.state.assignee,
            priority: this.state.priority,
            status: this.state.status,
            type: this.state.type
        }

        axios.post('http://localhost:3000/incidents/update/' + this.props._id, incident)
            .then(res => console.log(res.data));
        notify('Successfully updated.');   
    }
	
	render() {
		return(
            this.state.status !== 'Resolved' ? 
            <a href="#" onClick={this.handleClick} 
            className="btn btn-success"><i className="fa fa-check-square-o" aria-hidden="true"></i>Mark as Resolved</a> :
            <a href="#" onClick={this.handleClick}
            className="btn btn-secondary"><i className="fa fa-check-square-o" aria-hidden="true"></i>Mark as Open</a>          
		);
	}
}
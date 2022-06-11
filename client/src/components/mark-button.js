import React from 'react';
import IncidentDataService  from './incidents/services/incident-services';
import {  toast } from 'react-toastify';
const notify = (a) => toast(a);
export default class MarkButton extends React.Component {
	constructor(props) {
		super(props);

        this.handleClick = this.handleClick.bind(this);
		this.state = { 
            status: this.props.mark,
            _id: this.props.incidentID
        };
        console.log(this.state);
	}

	componentDidMount() {
    }

    handleClick(e) {
        e.preventDefault();
        
        IncidentDataService.get(this.state._id).then(res => 
        {
            console.log(res.data);
            this.setState({
            title :res.data.title,
            description: res.data.description,
            projectName :res.data.projectName,
            assignee : res.data.assignee,
            priority : res.data.priority,
            status : res.data.status,
            type : res.data.type
            });
            this.state.status !== 'Resolved' ?this.setState({status: 'Resolved'}) : this.setState({status: 'Open'});
            
            const incident = {
                title: this.state.title,
                description: this.state.description,
                projectName: this.state.projectName,
                assignee: this.state.assignee,
                priority: this.state.priority,
                status: this.state.status,
                type: this.state.type
            };
            IncidentDataService.update(this.props.incidentID, incident)
        .then(res => notify('Successfully updated.') );    
        }).catch((error) =>{ console.log(error); });
        
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
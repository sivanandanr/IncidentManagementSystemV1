import React, { Component} from 'react';
import IncidentDataService from './services/incident-services';
import ProjectDataService from '../projects/services/project-services';
import UserDataService from '../users/services/user-services';
import { toast } from 'react-toastify';
import * as myConstClass  from '../../const/constant';
const priorities = myConstClass.priorities;
const statuses = myConstClass.statuses;
const types = myConstClass.types;
const notify = (a) => toast(a);

export default class EditIncident extends Component {
    
    constructor(props) {
        
        super(props);
        
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeAssignee = this.onChangeAssignee.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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
       console.log(this.props.match);
        // default state of incident
        IncidentDataService.get(this.props.match.params.id)
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
        UserDataService.getAll()
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.name)
                })
            }
        })
        .catch((error) => { console.log(error); })

        // get list of projects to select from
        ProjectDataService.getAll()
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    projects: res.data.map(project => project.name)
                })
            }
        })
        .catch((error) => { console.log(error); })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeProjectName(e) {
        this.setState({
            projectName: e.target.value
        })
    }

    onChangeAssignee(e) {
        this.setState({
            assignee: e.target.value
        })
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        })
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        })
    }

    onSubmit(e) {
    	e.preventDefault();

    	const incident = {
            title: this.state.title,
            description: this.state.description,
            projectName: this.state.projectName,
            assignee: this.state.assignee,
            priority: this.state.priority,
            status: this.state.status,
            type: this.state.type
        }

        IncidentDataService.update(this.props.match.params.id, incident)
            .then(res => console.log(res.data));
            notify('Successfully updated.');
            setTimeout(()=> {
                this.props.history.push('/home');
            }, 500);
        
    }

	render() {
        
		return(
			<div className="card">
            <div className="card-header"><h3>Edit Incident</h3></div>
            <div className="card-body">
				
				<form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.title}
                               onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.description}
                               onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Project: </label>
                        <select required
                              className="form-control"
                              value={this.state.projectName}
                              onChange={this.onChangeProjectName}>
                              {
                                this.state.projects.map((project) => {
                                return <option key={project}
                                               value={project}>{project}
                                       </option>;
                                })
                              }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Assignee: </label>
                        <select required
                              className="form-control"
                              value={this.state.assignee}
                              onChange={this.onChangeAssignee}>
                              {
                                this.state.users.map((user) => {
                                return <option key={user}
                                               value={user}>{user}
                                       </option>;
                                })
                              }
                      </select>
                    </div>
                    <div className="form-group">
                        <label>Priority: </label>
                        <select required
                              className="form-control"
                              value={this.state.priority}
                              onChange={this.onChangePriority}>
                              {
                                  priorities.map((priority) => {
                                  return <option key={priority}
                                                 value={priority}>{priority}
                                         </option>;
                                  })
                              }
                      </select>
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <select required
                              className="form-control"
                              value={this.state.status}
                              onChange={this.onChangeStatus}>
                              {
                                  statuses.map((status) => {
                                  return <option key={status}
                                                 value={status}>{status}
                                         </option>;
                                  })
                              }
                      </select>
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <select required
                              className="form-control"
                              value={this.state.type}
                              onChange={this.onChangeType}>
                              {
                                  types.map((type) => {
                                  return <option key={type}
                                                 value={type}>{type}
                                         </option>;
                                  })
                              }
                      </select>
                    </div>
					<div className="form-group">
                        <input type="submit" value="Update Incident" className="btn btn-primary" />
                    </div>
				</form>
			</div>
            </div>
		);
	}
}
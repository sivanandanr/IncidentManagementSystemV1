import React, { Component } from 'react';
import IncidentDataService from './services/incident-services';
import ProjectDataService from '../projects/services/project-services';
import UserDataService from '../users/services/user-services';
import * as myConstClass  from '../../const/constant';
const priorities = myConstClass.priorities;
const statuses = myConstClass.statuses;
const types = myConstClass.types;

export default class CreateIncident extends Component {
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
  		    priority: 'Low',
  		    status: 'Open',
  		    type: 'Bug',
          users: [],
          projects: []
        };
    }

    componentDidMount() {
      // set default values for state properties
      this.setState({
        priority: priorities[0],
        status: statuses[0],
        type: types[0]
      });

      // get list of users to set default assignee
      UserDataService.getAll()
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.name),
                    assignee: res.data[0].name
                })
            }
        })
        .catch((error) => { console.log(error); })

        // get list of projects to set default project
        ProjectDataService.getAll()
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    projects: res.data.map(project => project.name),
                    projectName: res.data[0].name
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

        IncidentDataService.create(incident)
            .then(res => console.log(res.data))

        alert('Successfully created.');
        
        // clear form
        this.setState({ 
          title: '',
          description: '',
          priority: 'Low',
  		    status: 'Open',
  		    type: 'Bug',
        });
        
    }

	render() {
		return(
            <form onSubmit={this.onSubmit}>
			<div className="card">
            <div className="card-header">	<h3>Submit a Incident</h3></div>
            <div className="card-body">
			
				
					<div className="form-group">
						<label>Title: </label>
            	<input type="text" required
                  className="form-control"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
            	/>
					</div>
					<div className="form-group">
						<label>Description: </label>
            	<textarea style={{resize: 'none'}}
                  type="text" required
                  maxLength="250"
                  rows="3"
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
            	></textarea>
					</div>
					<div className="form-group">
						<label>Project Name: </label>
            	<select className="form-control" required
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
            <label>Assigned To: </label>
              <select className="form-control" required
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
            	<select className="form-control" required
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
            	<select className="form-control" required
                      value={this.state.status}
                      onChange={this.onChangeStatus}>
                      {
                          statuses.map((status) => {
                              if(status === "Open")
                          return <option key={status}
                                         value={status}>{status}
                                 </option>;
                          })
                      }
              </select>
					</div>
					<div className="form-group">
						<label>Type: </label>
            	<select className="form-control" required
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
                    <div className="form-group ">
              <input type="submit" 
                   value="Submit Incident"
                   className="btn btn-primary pull-left"
              />
          </div>
				
			</div>
            </div>
            </form>
		);
	}
}
import React, { Component } from 'react';
import ProjectDataService from './services/project-services';
import { ToastContainer, toast } from 'react-toastify';
const notify = (a) => toast(a);
export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            projects: [],
            name: ''
        }
    }

    componentDidMount() {
        // get list of projects to set default project
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

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const project = {
            name: this.state.name
        }

        console.log(project);

        ProjectDataService.create(project)
            .then(res => console.log(res.data));

        // clear form
        this.setState({ name: ''});
        notify('New Project added Successfully.');
    }

    render() {
        return (
            <div>
                <h3>Create New Project</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Project: </label>
                        <input type="text" required
                               className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Create Project"
                               className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

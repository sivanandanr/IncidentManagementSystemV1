import React, { Component } from 'react';
import axios from 'axios';
import * as myConstClass  from '../../const/constant';
import { ToastContainer, toast } from 'react-toastify';
const notify = (a) => toast(a);
const roles = myConstClass.roles;

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            role: '',
            password:''
        }
    }

    componentDidMount() {
        // set default values for state properties
        this.setState({
            role: roles[0]
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeRole(e) {
        this.setState({
            role: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role,
            password: this.state.password,
        }

        console.log(user);

        axios.post('http://localhost:3000/users/create', user)
            .then(res => console.log(res.data));

        // clear form
        this.setState({
            name: '',
            email: '',
            role: '',
            password:''
        });
        notify('New User added Successfully.');
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" required
                               className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" required
                               className="form-control"
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" required
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role: </label>
                        <select className="form-control" required
                                value={this.state.role}
                                onChange={this.onChangeRole}>
                                {
                                    roles.map((role) => {
                                    return <option key={role}
                                                   value={role}>{role}
                                           </option>;
                                    })
                                }
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Create User"
                               className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

import React, { Component } from 'react';

export default class LoginComponent extends Component 
{
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    onChangeUsername(e) {
        this.setState({
            userName: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
     
    onSubmit(e) {
        e.preventDefault();

        const user = {
            userName: this.state.name,
            password:this.state.password
        }

        this.props.history.push('/');
    }
    render() {
        return (
            <div className="container">
              <form onSubmit={this.onSubmit}>
            <div className="row">
            <div className="col">
              <input type="text" name="username" placeholder="Email" required onChange={this.onChangeUsername}/>
              <input type="password" name="password" placeholder="Password" required onChange={this.onChangePassword}/>
              <input type="submit" value="Login" className="btn btn-primary"/>
            </div>
          </div>
          </form>
      </div>   

        );}
}
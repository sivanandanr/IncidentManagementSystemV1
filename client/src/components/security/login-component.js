import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {login} from './services/authentication';
import UserDataService from '../users/services/user-services';
const notify = (a) => toast(a);

export default class LoginComponent extends Component 
{
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        localStorage.clear();
        this.state={
            userName: '',
            password: ''
        };
    }
    componentDidMount() {
        this.setState({
            userName: '',
            password: ''
          });
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
            userName: this.state.userName,
            password:this.state.password
        }
        UserDataService.findUser(user)
            .then(res => 
                {
                    var usr = res.data;
                    if(usr.length > 0)
                    {
                        login(usr[0]);
                        //localStorage.setItem("user",JSON.stringify(usr[0]));
                        notify('Successfully updated.');
                        //this.props.globalLogin(true);
                        setTimeout(()=> {
                            this.props.history.push('/home');
                        }, 500);
                    }else{
                        notify('login failed.Please try again..');
                        this.setState({
                            userName:'',
                            password:''
                        })
                    }
                }
            );
    }
    render() {
        return (
            <div className="container">
              <form onSubmit={this.onSubmit}>
                <div className="row">
                <div className="col">
                <div className="form-group">
                <label>Email: </label>
                <input type="text" required
                  className="form-control"
                  value={this.state.userName}
                  onChange={this.onChangeUsername}
            	/>
                </div>
                <div className="form-group">
                <label>Password: </label>
               <input type="password" required
                  className="form-control"
                  onChange={this.onChangePassword}
                  value={this.state.password}
            	/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary"/>
                </div>
            </div>
          </form>
      </div>   

        );}
}
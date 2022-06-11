import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom';

import {getAuthState,logout} from './components/security/services/authentication';
import "bootstrap/dist/css/bootstrap.min.css";
// import components
import LoginComponent from "./components/security/login-component";
import Navbar from "./components/navbar.component";
import Sidebar from "./components/sidebar.component";
import Dashboard from "./components/dashboard.component";
import CreateIncident from "./components/incidents/create-incident.component";
import CreateUser from "./components/users/create-user.component";
import ManageUsers from "./components/users/manage-users.component";
import ManageProjects from "./components/projects/manage-projects.component";
import EditIncident from "./components/incidents/edit-incident.component";
import {ErrorBoundary} from './components/shared/ErrorBoundary';
import ProtectedRoute from './shared/protected-route';
import Page404 from './components/shared/Page404';
const OurFallbackComponent = ({ error, componentStack, resetErrorBoundary }) => {
  return (
    <div>
      <h1>An error occurred: {error.message}</h1>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
export default class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
    };
   
  }

  componentDidMount() {
    const token = getAuthState().name ? true : false;
    if (token) {
      this.setState({ "isLoggedIn": true });
    }
  }
  globalLogin = () => {
    this.setState({ "isLoggedIn": true });
  }
  globalLogout = () => {
    this.setState({ "isLoggedIn": false });
    logout();
    return <Redirect to='/login' />;
  }
  
  render(){
    
  return (
    <ErrorBoundary  FallbackComponent={OurFallbackComponent}>
       <ToastContainer />
    <Router>
      <Navbar isLoggedIn={this.state.isLoggedIn} globalLogout={this.globalLogout}/>
      <div className="wrapper">
        <Sidebar />
        <div id="content">
          <ProtectedRoute path="/" exact component={Dashboard} />
          <ProtectedRoute path="/home" exact component={Dashboard} />
          {/* <Route exact  path="/login"render={(props) => <LoginComponent {...props}  globalLogin={this.globalLogin}/>}>
          </Route>   */}
          <Route exact  path="/login"  component={LoginComponent}></Route>
          <ProtectedRoute exact  path="/incidents/create" component={CreateIncident} />
          <ProtectedRoute exact  path="/manage-users" component={ManageUsers} />
          <ProtectedRoute exact  path="/users/create" component={CreateUser} />
          <ProtectedRoute exact  path="/manage-projects" component={ManageProjects} /> 
          <ProtectedRoute exact path="/edit/:id" component={EditIncident} />
         
        </div>
      </div>
    </Router>
    </ErrorBoundary>
  );
}
}


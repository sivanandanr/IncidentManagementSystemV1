import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
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

const OurFallbackComponent = ({ error, componentStack, resetErrorBoundary }) => {
  return (
    <div>
      <h1>An error occurred: {error.message}</h1>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
export default function App() {
  
  return (
    <ErrorBoundary  FallbackComponent={OurFallbackComponent}>
       <ToastContainer />
    <Router>
      <Navbar />
      <div className="wrapper">
        <Sidebar />
        <div id="content">
          <Route path="/" exact component={Dashboard} />
          <Route exact  path="/login" component={LoginComponent} />
          <Route exact  path="/incidents/create" component={CreateIncident} />
          <Route exact  path="/manage-users" component={ManageUsers} />
          <Route exact  path="/users/create" component={CreateUser} />
          <Route exact  path="/manage-projects" component={ManageProjects} />
          <Route exact path="/edit/:id" component={EditIncident} />
         
        </div>
      </div>
    </Router>
    </ErrorBoundary>
  );
}


import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { isLoggedin } from "../components/security/services/authentication";


const ProtectedRoute = ({ children, ...rest }) => {
  const location = useLocation();
  const isLoggedIn = isLoggedin();  
  return (
    <Route {...rest}>
      {isLoggedIn === true ? (
       children
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

export default ProtectedRoute;
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  const renderComponent = (props) => {
    if (!isAuthenticated && !loading) {
      return <Redirect to="/login" />;
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={(props) => renderComponent(props)} />;
};

export default PrivateRoute;

import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../header/Header';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props => {
      return isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />{' '}
        </div>
      ) : (
        <Redirect to="/" />
      );
    }}
  />
);

const mapStateToProps = (state, props) => {
  return { isAuthenticated: !!state.auth.uid };
};

export default connect(mapStateToProps)(PrivateRoute);

import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PropTypes from 'prop-types';

import DashboardPage from '../dashboard/DashboardPage';
import ClientDashboard from '../clients/ClientDashboard';
import NotFoundPage from '../notfound/NotFoundPage';
import LoginPage from '../login/LoginPage';
import ClientAdd from '../clients/ClientAdd';
import ClientEdit from '../clients/ClientEdit';

export const history = createHistory();

export class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <PublicRoute path="/" component={LoginPage} exact={true} />
            <PrivateRoute path="/dashboard" component={DashboardPage} exact={true}/>
            <PrivateRoute
              path="/clients"
              component={ClientDashboard}
              exact={true}
            />
            <PrivateRoute path="/clients/add" component={ClientAdd} exact={true}/>
            <PrivateRoute path="/clients/edit/:id" component={ClientEdit}/>
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    isAuthenticated: !!state.auth.uid,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };
};

export default connect(mapStateToProps)(AppRouter);

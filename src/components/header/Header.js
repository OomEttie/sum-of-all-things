import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../../actions/auth';
import Button from '@material-ui/core/Button';

export class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="content-container">
          <div className="header__content">
            <Link className="header__title" to="/dashboard">
              <h1>Sum of All things</h1>
            </Link>
            <button
              className="button button--link"
              onClick={this.props.startLogout}
            >
              Logout
            </button>
          </div>
          <div className="header__navigation">
            <div className="button-material-primary">
              <Button
                component={Link}
                to="/clients"
                variant="contained"
                color="primary"
              >
                Clients
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(
  undefined,
  mapDispatchToProps
)(Header);

import React from 'react';
import { connect } from 'react-redux';

export class DashboardPage extends React.Component {
  render() {
    return <div className="content-container"> This is the dashboard</div>;
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients
  };
};

export default connect(mapStateToProps)(DashboardPage);

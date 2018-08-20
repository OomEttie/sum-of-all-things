import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ClientList } from './ClientList';
import { startListClients } from '../../actions/clients';

export class ClientDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content-container">
        <ClientList clients={this.props.clients} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    clients: state.clients
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps)(ClientDashboard);

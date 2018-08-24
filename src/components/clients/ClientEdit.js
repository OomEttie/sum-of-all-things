import React from 'react';
import { connect } from 'react-redux';
import ClientForm from './ClientForm';
import { startEditClient, startRemoveClient } from '../../actions/clients';

export class ClientEdit extends React.Component {
  onSubmit = client => {
    this.props.editClient(this.props.client.id, { ...client });
    this.props.history.push('/clients');
  };

  onRemoveClient = id => {
    this.props.removeClient(id);
    this.props.history.push('/clients');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Client</h1>
          </div>
        </div>
        <div className="content-container">
          <ClientForm
            client={this.props.client}
            onSubmit={this.onSubmit}
            onRemoveClient={this.onRemoveClient}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    client: state.clients.find(client => {
      return client.id == props.match.params.id;
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editClient: (id, updates) => {
      dispatch(startEditClient(id, updates));
    },
    removeClient: id => {
      dispatch(startRemoveClient({ id: id }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientEdit);

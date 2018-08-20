import React from 'react';
import { connect } from 'react-redux';
import ClientForm from './ClientForm';
import { startAddClient } from '../../actions/clients';
import { clients } from '../../utils/__mocks__/clients';

export class ClientAdd extends React.Component {
  onSubmit = client => {
    this.props.addClient(client);
    this.props.history.push('/clients');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Client</h1>
          </div>
        </div>
        <div className="content-container">
          <ClientForm onSubmit={this.onSubmit}/>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addClient: client => {
      dispatch(startAddClient(client));
    }
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(ClientAdd);

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { ClientList } from './ClientList';

import { startListClients } from '../../actions/clients';

export class ClientDashboard extends React.Component {
  constructor(props) {
    super(props);

    // this.getClientsList();
  }

  // getClientsList() {
  //   console.log('getClientsList');
  //   this.props.listClients().then(snapshot => {
  //     console.log(getState().clients);
  //   });
  // }

  render() {
    return (
      <div className="content-container">
        <div className="button-material-primary">
          <Button
            component={Link}
            to="/clients/add"
            variant="fab"
            color="primary"
            aria-label="Add"
          >
            <AddIcon />
          </Button>
        </div>
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

// <ClientList />
// 

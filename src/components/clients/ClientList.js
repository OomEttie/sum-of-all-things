import React from 'react';
import { connect } from 'react-redux';
import { ClientListItem } from './ClientListItem';

import { Link } from 'react-router-dom';

export const ClientList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="header__content">
        <div className="show-for-mobile">Clients MOB</div>
        <div className="show-for-desktop">Clients</div>
      </div>
      <Link className="button " to="/clients/add">
        Add Client
      </Link>
    </div>
    <div className="list-body">
      {props.clients.length == 0 ? (
        <div className="list-item list-item--message">
          <span>No Clients</span>
        </div>
      ) : (
        props.clients.map(client => {
          return <ClientListItem key={client.id} {...client} />;
        })
      )}
    </div>
  </div>
);
ClientList.defaultProps = {
  clients: []
};

export default ClientList;

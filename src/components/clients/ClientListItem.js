import React from 'react';
import { Link } from 'react-router-dom';

export const ClientListItem = ({ dispatch, id, name, surname, note }) => (
  <div className="button-material-primary">
    <Link className="list-item" to={`/clients/edit/${id}`}>
      <div>
        <h3 className="list-item__title">
          {name} {surname}
        </h3>
        <span className="list-item__subtitle">{note}</span>
      </div>
    </Link>
  </div>
);

export default ClientListItem;

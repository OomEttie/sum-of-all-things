import React from 'react';
import { Link } from 'react-router-dom';

export const ClientListItem = ({ dispatch, id, name, surname, note }) => (
  <div className="button-material-primary">
    <Link className="list-item" to={`/client/edit/${id}`}>
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

// <Link className="list-item" exact={true} to={`/edit/${id}`}>
// <div>
//   <h3 className="list-item__title">{name} {surname}</h3>
//   <span className="list-item__subtitle">{note}</span>
// </div>
// </Link>

// moment.unix(createdAt).toString("MMM DD, YYYY")
// export const ExpenseListItem = connect()(ExpenseListItemConnected);

// export default ExpenseListItem;
// export default connect()(ExpenseListItem);

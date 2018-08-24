import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const ScheduleListItem = ({
  dispatch,
  id,
  description,
  start,
  end,
  client,
  note
}) => (
  <div className="button-material-primary">
    <Link className="list-item" to={`/schedule/edit/${id}`}>
      <div>
        <h3 className="list-item__title">
          {description} {note}
        </h3>
        <span className="list-item__subtitle">
          {moment.unix(start).format('MMM Do, YYYY')}
        </span>
      </div>
    </Link>
  </div>
);

export default ScheduleListItem;

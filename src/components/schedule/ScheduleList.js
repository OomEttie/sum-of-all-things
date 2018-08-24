import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ScheduleListItem } from './ScheduleListItem';

export const ScheduleList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="header__content">
        <div className="show-for-mobile">Schedules MOB</div>
        <div className="show-for-desktop">Schedules</div>
      </div>
      <Link className="button " to="/schedule/add">
        Add Schedule
      </Link>
    </div>
    <div className="list-body">
      {props.schedules.length == 0 ? (
        <div className="list-item list-item--message">
          <span>No Scheduled items</span>
        </div>
      ) : (
        props.schedules.map(schedule => {
          // return <p key={schedule.id}>{...schedule}</p>;
          return <ScheduleListItem key={schedule.id} {...schedule} />;
        })
      )}
    </div>
  </div>
);
ScheduleList.defaultProps = {
  schedules: []
};

export default ScheduleList;

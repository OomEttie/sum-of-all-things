import React from 'react';
import { connect } from 'react-redux';
import { ScheduleForm } from './ScheduleForm';
import { startAddSchedule } from '../../actions/schedules';
import { schedules } from '../../utils/__mocks__/schedules';

export class ScheduleAdd extends React.Component {
  onSubmit = schedule => {
    this.props.addSchedule(schedule);
    this.props.history.push('/schedule');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Schedule</h1>
          </div>
        </div>
        <div className="content-container">
          <ScheduleForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSchedule: schedule => {
      dispatch(startAddSchedule(schedule));
    }
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(ScheduleAdd);

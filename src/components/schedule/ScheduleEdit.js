import React from 'react';
import { connect } from 'react-redux';
import { ScheduleForm } from './ScheduleForm';
import {
  startEditSchedule,
  startRemoveSchedule
} from '../../actions/schedules';

export class ScheduleEdit extends React.Component {
  onSubmit = schedule => {
    this.props.editSchedule(this.props.schedule.id, { ...schedule });
    this.props.history.push('/schedule');
  };

  onRemoveSchedule = id => {
    this.props.removeSchedule(id);
    this.props.history.push('/schedule');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Schedule</h1>
          </div>
        </div>
        <div className="content-container">
          <ScheduleForm
            schedule={this.props.schedule}
            onSubmit={this.onSubmit}
            onRemoveSchedule={this.onRemoveSchedule}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    schedule: state.schedules.find(schedule => {
      return schedule.id == props.match.params.id;
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editSchedule: (id, updates) => {
      dispatch(startEditSchedule(id, updates));
    },
    removeSchedule: id => {
      dispatch(startRemoveSchedule({ id: id }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleEdit);

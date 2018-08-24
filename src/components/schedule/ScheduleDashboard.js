import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ScheduleList from './ScheduleList';

export class ScheduleDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content-container">
        <ScheduleList schedules={this.props.schedules} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    schedules: state.schedules
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps)(ScheduleDashboard);

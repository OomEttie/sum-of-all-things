import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import moment from 'moment';

import { SingleDatePicker, DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

import { scheduleObject } from '../../utils/__mocks__/schedules';

export class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);

    const scheduleData = scheduleObject();
    scheduleData.id = props.schedule ? props.schedule.id : '';
    scheduleData.description = props.schedule ? props.schedule.description : '';
    scheduleData.start = props.schedule ? props.schedule.start : 0;
    scheduleData.end = props.schedule ? props.schedule.end : 0;
    scheduleData.client = props.schedule ? props.schedule.client : '';
    scheduleData.note = props.schedule ? props.schedule.note : '';

    this.state = {
      ...scheduleData,
      calenderFocus: false,
      focusedInput: null,
      focused: null,
      error: ''
    };
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(prevState => ({ description: description }));
  };

  onClientChange = e => {
    const client = e.target.value;
    this.setState(prevState => ({ client: client }));
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(prevState => ({ note: note }));
  };

  onDateChange = date => {
    if (date) {
      this.setState(() => ({ start: date }));
      this.setState(() => ({ end: date }));
    }
  };

  // onDatesChange = dates => {
  //   if (dates.startDate) {
  //     this.setState(() => ({ start: moment(dates.startDate) }));
  //   }
  //   if (dates.endDate) {
  //     this.setState(() => ({ end: moment(dates.endDate) }));
  //   }
  // };

  onRemoveSchedule = e => {
    this.props.onRemoveSchedule(this.state.id);
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description) {
      this.setState(prevState => ({
        error: 'Please provide a description!'
      }));
    } else {
      this.setState(() => ({
        error: ''
      }));
      this.props.onSubmit({
        description: this.state.description,
        start: moment(this.state.start).unix(),
        end: moment(this.state.end).unix(),
        client: this.state.client,
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error.length > 0 && (
            <p className="form__error">{this.state.error}</p>
          )}
          <SingleDatePicker
            date={this.state.start} // momentPropTypes.momentObj or null
            onDateChange={this.onDateChange} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
            isOutsideRange={() => false}
            numberOfMonths={1}
          />
          <input
            className="text-input"
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            className="text-input"
            type="text"
            placeholder="Client"
            value={this.state.client}
            onChange={this.onClientChange}
          />
          <textarea
            className="textarea"
            placeholder="Add a note (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <div>
            <button>{this.props.schedule ? 'Save' : 'Add'} Schedule</button>
          </div>
          <div>
            {this.props.schedule && (
              <button onClick={this.onRemoveSchedule}>Remove Schedule</button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

// <DateRangePicker
//   startDate={this.state.start} // momentPropTypes.momentObj or null,
//   startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
//   endDate={this.state.end} // momentPropTypes.momentObj or null,
//   endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
//   onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
//   focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
//   onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
//   isOutsideRange={() => false}
//   numberOfMonths={1}
// />;

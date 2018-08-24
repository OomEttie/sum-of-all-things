import React from 'react';
import { shallow } from 'enzyme';
import { ScheduleAdd } from '../ScheduleAdd';
import { schedules } from '../../../utils/__mocks__/schedules';

let addSchedule, history, wrapper;

beforeEach(() => {
  addSchedule = jest.fn();
  history = { push: jest.fn() };

  wrapper = shallow(<ScheduleAdd addSchedule={addSchedule} history={history} />);
});

test('render add schedule page correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('handle add schedule onSubmit event', () => {
  wrapper.find('ScheduleForm').prop('onSubmit')(schedules[1]);

  expect(history.push).toHaveBeenLastCalledWith('/schedule');
  expect(addSchedule).toHaveBeenLastCalledWith(schedules[1]);
});

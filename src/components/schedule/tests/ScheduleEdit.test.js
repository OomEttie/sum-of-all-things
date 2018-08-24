import React from 'react';
import { shallow } from 'enzyme';
import { ScheduleEdit } from '../ScheduleEdit';
import { schedules } from '../../../utils/__mocks__/schedules';

let editSchedule, removeSchedule, history, wrapper;

beforeEach(() => {
  editSchedule = jest.fn();
  removeSchedule = jest.fn();
  history = { push: jest.fn() };

  wrapper = shallow(
    <ScheduleEdit
      schedule={schedules[1]}
      removeSchedule={removeSchedule}
      editSchedule={editSchedule}
      history={history}
    />
  );
});

test('render edit schedule page correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('edit schedule onSubmit event', () => {
  wrapper.find('ScheduleForm').prop('onSubmit')(schedules[1]);

  expect(history.push).toHaveBeenLastCalledWith('/schedule');
  expect(editSchedule).toHaveBeenLastCalledWith(schedules[1].id, {
    ...schedules[1]
  });
});

test('edit schedule onRemoveSchedule event', () => {
  wrapper.find('ScheduleForm').prop('onRemoveSchedule')(schedules[1]);

  expect(history.push).toHaveBeenLastCalledWith('/schedule');
  expect(removeSchedule).toHaveBeenLastCalledWith({ ...schedules[1] });
});

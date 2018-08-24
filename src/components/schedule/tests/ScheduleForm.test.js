import React from 'react';
import { shallow } from 'enzyme';
import { ScheduleForm } from '../ScheduleForm';
import { schedules } from '../../../utils/__mocks__/schedules';

let wrapper;

beforeEach(() => {});

test('render schedule page correctly', () => {
  wrapper = shallow(<ScheduleForm />);
  expect(wrapper).toMatchSnapshot();
});

test('render schedule page correctly with data', () => {
  wrapper = shallow(<ScheduleForm schedule={schedules[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('render schedule form with invalid data', () => {
  const wrapper = shallow(<ScheduleForm />);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('call scheduleForm onSubmit for valid submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ScheduleForm schedule={schedules[1]} onSubmit={onSubmitSpy} />
  );
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });

  // console.log(wrapper.state('error'));
  expect(wrapper.state('error').length).toBe(0);
  expect(onSubmitSpy).toHaveBeenCalled();

  let scheduleToManipulate = { ...schedules[1] };
  delete scheduleToManipulate.id;
  expect(onSubmitSpy).toHaveBeenCalledWith({ ...scheduleToManipulate });
});

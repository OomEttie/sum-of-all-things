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

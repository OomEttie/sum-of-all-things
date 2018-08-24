import React from 'react';
import { shallow } from 'enzyme';
import { ScheduleDashboard } from '../ScheduleDashboard';

test('should render ScheduleDashboard correctly', () => {
  const wrapper = shallow(<ScheduleDashboard />);
  expect(wrapper).toMatchSnapshot();
});


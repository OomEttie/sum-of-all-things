import React from 'react';
import { shallow } from 'enzyme';
import { ClientDashboard } from './ClientDashboard'

test('should render ClientDashboard correctly', () => {
  const wrapper = shallow(<ClientDashboard />);
  expect(wrapper).toMatchSnapshot();
});

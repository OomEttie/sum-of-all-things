import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import ClientList from './ClientList';
import { clients } from '../../utils/__mocks__/clients';

test('render client list component correctly', () => {
  const wrapper = shallow(<ClientList />);
  expect(wrapper).toMatchSnapshot();
});

test('render client list component with data', () => {
  const wrapper = shallow(<ClientList clients={clients} />);
  expect(wrapper).toMatchSnapshot();
});

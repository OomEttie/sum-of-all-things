import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import ClientForm from './ClientForm';
import { clients } from '../../utils/__mocks__/clients';

test('render client form correctly', () => {
  const wrapper = shallow(<ClientForm />);
  expect(wrapper).toMatchSnapshot();
});

test('render client form with data', () => {
  const wrapper = shallow(<ClientForm client={clients[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('render client form with invalid data', () => {
  const wrapper = shallow(<ClientForm />);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('call onSubmit for valid submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ClientForm client={clients[1]} onSubmit={onSubmitSpy} />
  );
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });

  expect(wrapper.state('error').length).toBe(0);
  expect(onSubmitSpy).toHaveBeenCalled();
  expect(onSubmitSpy).toHaveBeenCalledWith({
    name: clients[1].name,
    surname: clients[1].surname,
    note: clients[1].note
  });
});

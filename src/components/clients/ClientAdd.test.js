import React from 'react';
import { shallow } from 'enzyme';
import { ClientAdd } from './ClientAdd';
import { clients } from '../../utils/__mocks__/clients';

let addClient, history, wrapper;

beforeEach(() => {
  addClient = jest.fn();
  history = { push: jest.fn() };

  wrapper = shallow(<ClientAdd addClient={addClient} history={history} />);
});

test('render add Client page correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('handle add Client onSubmit event', () => {
  wrapper.find('Connect(ClientForm)').prop('onSubmit')(clients[1]);

  expect(history.push).toHaveBeenLastCalledWith('/clients');
  expect(addClient).toHaveBeenLastCalledWith(clients[1]);
});

import React from 'react';
import { shallow } from 'enzyme';
import { ClientEdit } from './ClientEdit';
import { clients } from '../../utils/__mocks__/clients';

let editClient, removeClient, history, wrapper;

beforeEach(() => {
  editClient = jest.fn();
  removeClient = jest.fn();
  history = { push: jest.fn() };

  wrapper = shallow(
    <ClientEdit
      client={clients[1]}
      editClient={editClient}
      removeClient={removeClient}
      history={history}
    />
  );
});

test('render edit Client page correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('handle edit Client onSubmit event', () => {
  wrapper.find('Connect(ClientForm)').prop('onSubmit')(clients[1]);

  expect(history.push).toHaveBeenLastCalledWith('/clients');
  expect(editClient).toHaveBeenLastCalledWith(clients[1].id, clients[1]);
});

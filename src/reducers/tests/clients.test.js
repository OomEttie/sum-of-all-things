import {
  ACTION_CLIENT_ADD,
  ACTION_CLIENT_EDIT,
  ACTION_CLIENT_REMOVE,
  ACTION_CLIENT_LIST
} from '../../actions/actions-list';

import { clientsReducer } from '../clients';
import { clients } from '../../utils/__mocks__/clients';

import moment from 'moment';

test('clients reducer default state', () => {
  const state = clientsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

//
// ADD_CLIENT
//
test('add a new client', () => {
  const action = {
    type: ACTION_CLIENT_ADD,
    client: clients[1]
  };
  const state = clientsReducer(clients, action);
  expect(state).toEqual([...clients, action.client]);
});

//
// REMOVE_CLIENT
//
test('remove client by ID', () => {
  const action = {
    type: ACTION_CLIENT_REMOVE,
    id: clients[1].id
  };
  const state = clientsReducer(clients, action);
  expect(state).toEqual([clients[0], clients[2]]);
});

test('should not remove client if ID not found', () => {
  const action = {
    type: ACTION_CLIENT_REMOVE,
    id: -1
  };
  const state = clientsReducer(clients, action);
  expect(state).toEqual(clients);
});

//
// EDIT_EXPENSE
//
test('edit an client', () => {
  const change = 'new update on client';
  const action = {
    type: ACTION_CLIENT_EDIT,
    id: clients[1].id,
    updates: {
      note: change
    }
  };
  const state = clientsReducer(clients, action);
  // console.log(state);
  expect(state[1].note).toBe(change);
});

test('should not edit an client if ID not found', () => {
  const change = 'new updates expenses';
  const action = {
    type: ACTION_CLIENT_EDIT,
    id: '-1',
    updates: {
      note: change
    }
  };
  const state = clientsReducer(clients, action);
  // console.log(state);
  expect(state).toEqual(clients);
});

//
// SET_EXPENSES
//
test('should list all expenses', () => {
  const action = {
    type: ACTION_CLIENT_LIST,
    clients: [clients[1]]
  };
  const state = clientsReducer(clients, action);
  expect(state).toEqual([clients[1]]);
});

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import database, { clientsDatabaseRef } from '../../utils/firebase';

import {
  removeClient,
  addClient,
  startAddClient,
  listClients,
  startListClients,
  startRemoveClient,
  editClient,
  startEditClient
} from '../clients';

import { clients, clientObject } from '../../utils/__mocks__/clients';
import {
  ACTION_CLIENT_ADD,
  ACTION_CLIENT_EDIT,
  ACTION_CLIENT_REMOVE,
  ACTION_CLIENT_LIST
} from '../actions-list';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

beforeEach(() => {
  const clientsData = {};
  clients.forEach(({ id, name, surname, note }) => {
    clientsData[id] = { name, surname, note };
  });

  const dbPath = clientsDatabaseRef('UID_unknown');
  database.ref(dbPath).set(clientsData);
});

//
// ADD CLIENT
//
test('setup the addClient action with provided values', () => {
  const action = addClient(clients[2]);

  expect(action).toEqual({
    type: ACTION_CLIENT_ADD,
    client: clients[2]
  });
});

test('add a client to the database', done => {
  const store = mockStore({});
  const data = {
    name: 'testing new client name',
    surname: 'testing new client surname',
    note: 'testing new client note'
  };

  store
    .dispatch(startAddClient(data))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: ACTION_CLIENT_ADD,
        client: {
          id: expect.any(String),
          ...data
        }
      });

      let dbPath = clientsDatabaseRef('UID_unknown');
      dbPath = `${dbPath}/${actions[0].client.id}`;

      return database.ref(dbPath).once('value');
    })
    .then(snapshot => {
      const snapshotVal = snapshot.val();
      expect(snapshotVal).toEqual(data);
      done();
    });
});

//
// REMOVE CLIENT
//
test('remove client action init', () => {
  const action = removeClient({ id: 'testing123' });

  expect(action).toEqual({
    type: ACTION_CLIENT_REMOVE,
    id: 'testing123'
  });
});

test('remove client with provided id value', done => {
  const store = mockStore({});
  const id = clients[0].id;
  store
    .dispatch(startRemoveClient({ id: id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: ACTION_CLIENT_REMOVE,
        id: id
      });

      const dbPath = clientsDatabaseRef('UID_unknown');

      return database.ref(`${dbPath}/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(null);
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

//
// LIST CLIENTS
//
test('set Clients action object with data', () => {
  const action = listClients(clients);
  expect(action).toEqual({
    type: ACTION_CLIENT_LIST,
    clients
  });
});

test('process startListClients and get data', done => {
  const store = mockStore({});
  store.dispatch(startListClients()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ACTION_CLIENT_LIST,
      clients
    });
    done();
  });
});

//
// EDIT CLIENT
//
test('setup the edit client action', () => {
  const action = editClient('123abc', { note: 'testing note prop' });
  expect(action).toEqual({
    type: ACTION_CLIENT_EDIT,
    id: '123abc',
    updates: {
      note: 'testing note prop'
    }
  });
});

test('edit client with provided id value', done => {
  const store = mockStore({});
  const id = clients[1].id;
  let updates = {
    ...clients[1],
    name: 'updated name'
  };

  store
    .dispatch(startEditClient(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: ACTION_CLIENT_EDIT,
        id: id,
        updates: updates
      });

      const dbPath = clientsDatabaseRef('UID_unknown');
      return database.ref(`${dbPath}/${id}`).once('value');
    })
    .then(snapshot => {
      updates = { ...clients[1], ...updates };
      expect(snapshot.val()).toEqual({ ...clients[1], ...updates });
      done();
    });
});

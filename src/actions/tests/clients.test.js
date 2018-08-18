import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import database, { clientsDatabaseRef } from '../../utils/firebase';

import { addClient, startAddClient, listClients, startListClients  } from '../clients';

import { clients } from '../../utils/__mocks__/clients';
import {
  ACTION_CLIENT_ADD,
  ACTION_CLIENT_EDIT,
  ACTION_CLIENT_REMOVE,
  ACTION_CLIENT_LIST
} from '../actions-list';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//add the default __mock__ clients
beforeEach(done => {
  const clientsData = {};
  clients.forEach(({ id, name, surname, note }) => {
    clientsData[id] = { name, surname, note };
  });

  const dbPath = clientsDatabaseRef('UID_unknown');
  database
    .ref(dbPath)
    .set(clientsData)
    .then(() => done());
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

// LIST CLIENTS
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
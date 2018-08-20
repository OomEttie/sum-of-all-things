const uuidV4 = require('uuid/v4');
import database, { clientsDatabaseRef } from '../utils/firebase';

import {
  ACTION_CLIENT_ADD,
  ACTION_CLIENT_EDIT,
  ACTION_CLIENT_LIST,
  ACTION_CLIENT_REMOVE
} from '../actions/actions-list';

//
// ACTION_CLIENT_ADD
//
export const addClient = client => ({
  type: ACTION_CLIENT_ADD,
  client
});

export const startAddClient = (clientData = {}) => {
  return (dispatch, getState) => {
    const { name = '', surname = '', note = '' } = clientData;

    const client = { name, surname, note };

    const dbPath = clientsDatabaseRef(
      getState().auth ? getState().auth.uid : 'UID_unknown'
    );

    return database
      .ref(dbPath)
      .push(client)
      .then(ref => {
        dispatch(
          addClient({
            id: ref.key,
            ...client
          })
        );
      });
  };
};

//
// REMOVE_EXPENSE
//
export const removeClient = ({ id } = {}) => ({
  type: ACTION_CLIENT_REMOVE,
  id: id
});

export const startRemoveClient = ({ id }) => {
  return (dispatch, getState) => {
    const dbPath = clientsDatabaseRef(
      getState().auth ? getState().auth.uid : 'UID_unknown'
    );

    return database
      .ref(`${dbPath}/${id}`)
      .remove()
      .then(data => {
        dispatch(removeClient({ id }));
      });
  };
};

//
// EDIT_CLIENT
//
export const editClient = (id, updates) => ({
  type: ACTION_CLIENT_EDIT,
  id,
  updates
});

export const startEditClient = (id, updates) => {
  return (dispatch, getState) => {
    let dbPath = clientsDatabaseRef(
      getState().auth ? getState().auth.uid : 'UID_unknown'
    );

    return database
      .ref(`${dbPath}/${id}`)
      .update({
        ...updates
      })
      .then(() => {
        dispatch(editClient(id, updates));
      });
  };
};

//
// LIST CLIENTS
//
export const listClients = clients => ({
  type: ACTION_CLIENT_LIST,
  clients
});

export const startListClients = () => {
  return (dispatch, getState) => {
    const dbPath = clientsDatabaseRef(
      getState().auth ? getState().auth.uid : 'UID_unknown'
    );
    return database
      .ref(dbPath)
      .once('value')
      .then(snapshot => {
        const clientsData = [];
        snapshot.forEach(snapshotChild => {
          clientsData.push({
            id: snapshotChild.key,
            ...snapshotChild.val()
          });
        });
        dispatch(listClients(clientsData));
      })
      .catch(e => {});
  };
};

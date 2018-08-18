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

// //
// // REMOVE_EXPENSE
// //
// export const removeExpense = ({ id } = {}) => ({
//   type: 'REMOVE_EXPENSE',
//   id: id
// });

// export const startRemoveExpense = ({ id }) => {
//   return (dispatch, getState) => {
//     const dbPath = expensesRef(
//       getState().auth ? getState().auth.uid : 'UID_unknown'
//     );
//     return database
//       .ref(`${dbPath}/${id}`)
//       .remove()
//       .then(data => {
//         dispatch(removeExpense({ id }));
//       });
//   };
// };

// //
// // EDIT_EXPENSE
// //
// export const editExpense = (id, updates) => ({
//   type: 'EDIT_EXPENSE',
//   id,
//   updates
// });

// export const startEditExpense = (id, updates) => {
//   return (dispatch, getState) => {
//     const dbPath = expensesRef(
//       getState().auth ? getState().auth.uid : 'UID_unknown'
//     );
//     return database
//       .ref(`${dbPath}/${id}`)
//       .update({
//         ...updates
//       })
//       .then(() => {
//         dispatch(editExpense(id, updates));
//       });
//   };
// };

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
        const clients = [];
        snapshot.forEach(snapshotChild => {
          clients.push({
            id: snapshotChild.key,
            ...snapshotChild.val()
          });
        });
        dispatch(listClients(clients));
      })
      .catch(e => {});
  };
};

import { clients } from '../utils/__mocks__/clients';
import {
  ACTION_CLIENT_ADD,
  ACTION_CLIENT_REMOVE,
  ACTION_CLIENT_EDIT,
  ACTION_CLIENT_LIST
} from '../actions/actions-list';

const clientsReducerDefaultState = [];

export const clientsReducer = (
  state = clientsReducerDefaultState,
  action
) => {
  switch (action.type) {
    case ACTION_CLIENT_ADD:
      return [...state, action.client];
    case ACTION_CLIENT_REMOVE:
      return state.filter(data => data.id != action.id);
    case ACTION_CLIENT_EDIT: {
      return state.map(client => {
        if (client.id == action.id) {
          return { ...client, ...action.updates };
        } else {
          return client;
        }
      });
    }
    case ACTION_CLIENT_LIST:
      return action.clients;
    default:
      return state;
  }
};

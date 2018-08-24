import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import database, { schedulesDatabaseRef } from '../../utils/firebase';

import { schedules, scheduleObject } from '../../utils/__mocks__/schedules';

import {
  ACTION_SCHEDULE_ADD,
  ACTION_SCHEDULE_EDIT,
  ACTION_SCHEDULE_REMOVE,
  ACTION_SCHEDULE_LIST
} from '../actions-list';

import {
  addSchedule,
  startAddSchedule,
  removeSchedule,
  startRemoveSchedule,
  editSchedule,
  startEditSchedule,
  listSchedules,
  startListSchedules
} from '../schedules';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

beforeEach(() => {
  const schedulesData = {};
  schedules.forEach(({ id, description, start, end, client, note }) => {
    schedulesData[id] = { description, start, end, client, note };
  });

  const dbPath = schedulesDatabaseRef('UID_unknown');
  database.ref(dbPath).set(schedulesData);
});

//
// add schedule
//
test('setup the add schedule action with provided values', () => {
  const action = addSchedule(schedules[2]);

  expect(action).toEqual({
    type: ACTION_SCHEDULE_ADD,
    schedule: schedules[2]
  });
});

test('add a schedule to the database', done => {
  const store = mockStore({});
  const data = {
    description: 'description new',
    start: 1000,
    end: 2000,
    client: 'client new',
    note: 'note new'
  };

  store
    .dispatch(startAddSchedule(data))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: ACTION_SCHEDULE_ADD,
        schedule: {
          id: expect.any(String),
          ...data
        }
      });

      let dbPath = schedulesDatabaseRef('UID_unknown');
      dbPath = `${dbPath}/${actions[0].schedule.id}`;

      return database.ref(dbPath).once('value');
    })
    .then(snapshot => {
      const snapshotVal = snapshot.val();
      expect(snapshotVal).toEqual(data);
      done();
    });
});

//
// remove schedule
//
test('remove schedule action init', () => {
  const action = removeSchedule({ id: 'testing123' });

  expect(action).toEqual({
    type: ACTION_SCHEDULE_REMOVE,
    id: 'testing123'
  });
});

test('remove schedule with provided id value', done => {
  const store = mockStore({});
  const id = schedules[0].id;
  store
    .dispatch(startRemoveSchedule({ id: id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: ACTION_SCHEDULE_REMOVE,
        id: id
      });

      const dbPath = schedulesDatabaseRef('UID_unknown');

      return database.ref(`${dbPath}/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(null);
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

//
// EDIT CLIENT
//
test('setup the edit schedule action', () => {
  const change = 'testing description prop';
  const action = editSchedule('123abc', { description: change });
  expect(action).toEqual({
    type: ACTION_SCHEDULE_EDIT,
    id: '123abc',
    updates: {
      description: change
    }
  });
});

test('edit schedule with provided id value', done => {
  const store = mockStore({});
  const id = schedules[1].id;
  let updates = {
    ...schedules[1],
    description: 'updated description'
  };

  store
    .dispatch(startEditSchedule(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: ACTION_SCHEDULE_EDIT,
        id: id,
        updates: updates
      });

      const dbPath = schedulesDatabaseRef('UID_unknown');
      return database.ref(`${dbPath}/${id}`).once('value');
    })
    .then(snapshot => {
      updates = { ...schedules[1], ...updates };
      expect(snapshot.val()).toEqual({ ...schedules[1], ...updates });
      done();
    });
});

//
// list schedules
//
test('set schedules list action object with data', () => {
  const action = listSchedules(schedules);
  expect(action).toEqual({
    type: ACTION_SCHEDULE_LIST,
    schedules
  });
});

test('process startListschedules and get data', done => {
  const store = mockStore({});
  store.dispatch(startListSchedules()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ACTION_SCHEDULE_LIST,
      schedules
    });
    done();
  });
});

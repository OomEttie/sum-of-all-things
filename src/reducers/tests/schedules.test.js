import {
  ACTION_SCHEDULE_ADD,
  ACTION_SCHEDULE_EDIT,
  ACTION_SCHEDULE_REMOVE,
  ACTION_SCHEDULE_LIST
} from '../../actions/actions-list';

import { schedulesReducer } from '../schedules';
import { schedules } from '../../utils/__mocks__/schedules';

import moment from 'moment';

test('schedules reducer default state', () => {
  const state = schedulesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

//
// add schedule
//
test('add a new schedule', () => {
  const action = {
    type: ACTION_SCHEDULE_ADD,
    schedule: schedules[1]
  };
  const state = schedulesReducer(schedules, action);
  expect(state).toEqual([...schedules, action.schedule]);
});

//
// remove schedule
//
test('remove schedule by ID', () => {
  const action = {
    type: ACTION_SCHEDULE_REMOVE,
    id: schedules[1].id
  };
  const state = schedulesReducer(schedules, action);
  expect(state).toEqual([schedules[0], schedules[2]]);
});

test('should not remove schedule if ID not found', () => {
  const action = {
    type: ACTION_SCHEDULE_REMOVE,
    id: -1
  };
  const state = schedulesReducer(schedules, action);
  expect(state).toEqual(schedules);
});

//
// EDIT_EXPENSE
//
test('edit an schedule', () => {
  const change = 'new update on schedule';
  const action = {
    type: ACTION_SCHEDULE_EDIT,
    id: schedules[1].id,
    updates: {
      description: change
    }
  };
  const state = schedulesReducer(schedules, action);
  // console.log(state);
  expect(state[1].description).toBe(change);
});

test('should not edit an schedule if ID not found', () => {
  const change = 'new update on schedule';
  const action = {
    type: ACTION_SCHEDULE_EDIT,
    id: '-1',
    updates: {
      description: change
    }
  };
  const state = schedulesReducer(schedules, action);
  expect(state).toEqual(schedules);
});

//
// list schedules
//
test('should list all schedules', () => {
  const action = {
    type: ACTION_SCHEDULE_LIST,
    schedules: [schedules[1]]
  };
  const state = schedulesReducer(schedules, action);
  expect(state).toEqual([schedules[1]]);
});

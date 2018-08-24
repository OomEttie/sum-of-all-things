const uuidV4 = require('uuid/v4');
import database, { schedulesDatabaseRef } from '../utils/firebase';

import {
  ACTION_SCHEDULE_ADD,
  ACTION_SCHEDULE_EDIT,
  ACTION_SCHEDULE_LIST,
  ACTION_SCHEDULE_REMOVE
} from '../actions/actions-list';

//
// action schedule add
//
export const addSchedule = schedule => ({
  type: ACTION_SCHEDULE_ADD,
  schedule
});

export const startAddSchedule = (scheduleData = {}) => {
  return (dispatch, getState) => {
    const {
      description = '',
      start = 0,
      end = 0,
      client = '',
      note = ''
    } = scheduleData;

    const schedule = { description, start, end, client, note };

    const dbPath = schedulesDatabaseRef(
      getState().auth ? getState().auth.uid : 'UID_unknown'
    );

    return database
      .ref(dbPath)
      .push(schedule)
      .then(ref => {
        dispatch(
          addSchedule({
            id: ref.key,
            ...schedule
          })
        );
      });
  };
};

//
// remove schedule
//
export const removeSchedule = ({ id } = {}) => ({
  type: ACTION_SCHEDULE_REMOVE,
  id: id
});

export const startRemoveSchedule = ({ id }) => {
  return (dispatch, getState) => {
    const dbPath = schedulesDatabaseRef(
      getState().auth ? getState().auth.uid : 'UID_unknown'
    );

    return database
      .ref(`${dbPath}/${id}`)
      .remove()
      .then(data => {
        dispatch(removeSchedule({ id }));
      });
  };
};

//
// EDIT_CLIENT
//
export const editSchedule = (id, updates) => ({
  type: ACTION_SCHEDULE_EDIT,
  id,
  updates
});

export const startEditSchedule = (id, updates) => {
  return (dispatch, getState) => {
    let dbPath = schedulesDatabaseRef(
      getState().auth ? getState().auth.uid : 'UID_unknown'
    );

    return database
      .ref(`${dbPath}/${id}`)
      .update({
        ...updates
      })
      .then(() => {
        dispatch(editSchedule(id, updates));
      });
  };
};

//
// list schedules
//
export const listSchedules = schedules => ({
  type: ACTION_SCHEDULE_LIST,
  schedules
});

export const startListSchedules = () => {
  return (dispatch, getState) => {
    const dbPath = schedulesDatabaseRef(
      getState().auth ? getState().auth.uid : 'UID_unknown'
    );
    return database
      .ref(dbPath)
      .once('value')
      .then(snapshot => {
        const schedulesData = [];
        snapshot.forEach(snapshotChild => {
          schedulesData.push({
            id: snapshotChild.key,
            ...snapshotChild.val()
          });
        });
        dispatch(listSchedules(schedulesData));
      })
      .catch(e => {});
  };
};

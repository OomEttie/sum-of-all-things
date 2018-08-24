import {
  ACTION_SCHEDULE_ADD,
  ACTION_SCHEDULE_REMOVE,
  ACTION_SCHEDULE_EDIT,
  ACTION_SCHEDULE_LIST
} from '../actions/actions-list';

const schedulesReducerDefaultState = [];

export const schedulesReducer = (
  state = schedulesReducerDefaultState,
  action
) => {
  switch (action.type) {
    case ACTION_SCHEDULE_ADD:
      return [...state, action.schedule];
    case ACTION_SCHEDULE_REMOVE:
      return state.filter(data => data.id != action.id);
    case ACTION_SCHEDULE_EDIT: {
      return state.map(schedule => {
        if (schedule.id == action.id) {
          return { ...schedule, ...action.updates };
        } else {
          return schedule;
        }
      });
    }
    case ACTION_SCHEDULE_LIST:
      return action.schedules;
    default:
      return state;
  }
};

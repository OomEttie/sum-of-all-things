export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_EXPENS':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      console.log('LOGOUT');
      return {};
    default:
      return state;
  }
};

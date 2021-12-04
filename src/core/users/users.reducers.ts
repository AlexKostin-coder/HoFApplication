import {
  GET_USER,
  defaultUsers
} from "./users.const";

export const users = (state: MainState['users'] = defaultUsers, action: Action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}
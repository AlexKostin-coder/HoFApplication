import {
  GET_USER,
  defaultUsers
} from "./users.const";

import { LOG_OUT } from "../auth/auth.const";

export const users = (state: MainState['users'] = defaultUsers, action: Action) => {
  switch (action.type) {
    case GET_USER:
      const id = action.payload.user_id;
      return {
        ...state,
        [id]: {
          ...(state[id] ? state[id] : {}),
          ...action.payload,
        },
      }
    case LOG_OUT:
      return defaultUsers;
    default:
      return state;
  }
}
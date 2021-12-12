import {
  GET_USER,
  defaultUsers
} from "./users.const";

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
    default:
      return state;
  }
}
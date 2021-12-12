import {
  GET_ROOMS,
  defaultRooms
} from "./rooms.const";

import { LOG_OUT } from "../auth/auth.const";

export const rooms = (state: MainState['rooms'] = defaultRooms, action: Action) => {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        ...action.payload.rooms,
      }
    case LOG_OUT:
      return defaultRooms;
    default:
      return state;
  }
}
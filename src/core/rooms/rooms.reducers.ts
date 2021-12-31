import {
  CREATE_ROOM,
  DELETE_ROOM,
  EDIT_ROOM,
  GET_ROOMS,
  UPLOAD_IMAGE_ROOM,
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
    case EDIT_ROOM:
      return {
        ...state,
        [action.payload.room._id]: { ...action.payload.room }
      }
    case CREATE_ROOM:
    case UPLOAD_IMAGE_ROOM:
      return {
        ...state,
        [action.payload._id]: { ...action.payload }
      }
    case DELETE_ROOM:
      return {
        ...Object.keys(state)
          .filter((roomId: String) => roomId !== action.payload.roomId)
          .reduce((acc: MainState['rooms'], roomId: String) => {
            acc[String(roomId)] = state[String(roomId)];
            return acc;
          }, {})
      }
    case LOG_OUT:
      return defaultRooms;
    default:
      return state;
  }
}
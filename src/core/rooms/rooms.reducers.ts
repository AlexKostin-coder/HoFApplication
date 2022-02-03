import {
  CREATE_ROOM,
  DELETE_ROOM,
  DELETE_TEMPERATURE_SENSORS_IN_ROOM,
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
    case CREATE_ROOM:
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
    case DELETE_TEMPERATURE_SENSORS_IN_ROOM:
      const room_id = action.payload.room_id;
      const devices_id = action.payload.devices_id;
      return {
        ...state,
        [room_id]: {
          ...state[room_id],
          ...state[room_id]
            ? state[room_id].temperature_sensors.filter((temperature_sensors_id) => !devices_id.includes(temperature_sensors_id))
            : []
        }
      }
    case LOG_OUT:
      return defaultRooms;
    default:
      return state;
  }
}
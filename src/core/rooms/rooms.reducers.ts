import {
  GET_ROOMS,
  defaultRooms
} from "./rooms.const";

export const rooms = (state: MainState['rooms'] = defaultRooms, action: Action) => {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        ...action.payload.rooms,
      }
    default:
      return state;
  }
}
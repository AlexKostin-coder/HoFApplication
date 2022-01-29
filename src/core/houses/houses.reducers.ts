import {
  CREATE_HOUSE,
  DELETE_HOUSE,
  EDIT_HOUSE,
  GET_HOUSES,
  SET_CURRENT_HOUSE_ID,
  defaultCurrentHouseId,
  defaultHouses
} from "./houses.const";

import { LOG_OUT } from "../auth/auth.const";

export const houses = (state: MainState['houses'] = defaultHouses, action: Action) => {
  switch (action.type) {
    case GET_HOUSES:
      return {
        ...state,
        ...action.payload.houses,
      }
    case CREATE_HOUSE:
      return {
        ...state,
        [action.payload._id]: action.payload
      }
    case EDIT_HOUSE:
      return {
        ...state,
        [action.payload.house._id]: action.payload.house
      }
    case DELETE_HOUSE:
      return {
        ...Object.keys(state)
          .filter((house_id: String) => house_id !== action.payload.house_id)
          .reduce((acc: MainState['houses'], house_id: String) => {
            acc[String(house_id)] = state[String(house_id)];
            return acc;
          }, {})
      }
    case LOG_OUT:
      return defaultHouses;
    default:
      return state;
  }
}

export const currentHouseId = (state: MainState['currentHouseId'] = defaultCurrentHouseId, action: Action) => {
  switch (action.type) {
    case SET_CURRENT_HOUSE_ID:
      return {
        ...state,
        _id: action.payload.house_id
      }
    case LOG_OUT:
      return defaultCurrentHouseId
    default:
      return state;
  }
}
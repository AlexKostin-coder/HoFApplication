import {
  CREATE_HOUSE,
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
import {
  GET_HOUSES,
  SET_CURRENT_HOUSE_ID,
  defaultCurrentHouseId,
  defaultHouses
} from "./houses.const";

export const houses = (state: MainState['houses'] = defaultHouses, action: Action) => {
  switch (action.type) {
    case GET_HOUSES:
      return {
        ...state,
        ...action.payload.houses,
      }
    default:
      return state;
  }
}

export const currentHouseId = (state: MainState['current_house_id'] = defaultCurrentHouseId, action: Action) => {
  switch (action.type) {
    case SET_CURRENT_HOUSE_ID:
      return {
        ...state,
      }
    default:
      return state;
  }
}
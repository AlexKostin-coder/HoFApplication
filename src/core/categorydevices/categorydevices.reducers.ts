import {
  GET_CATEGORYS,
  defaultCategorysDevices
} from "./categoryDevices.const";

import { LOG_OUT } from "../auth/auth.const";

export const categoryDevices = (state: MainState['categoryDevices'] = defaultCategorysDevices, action: Action) => {
  switch (action.type) {
    case GET_CATEGORYS:
      return {
        ...state,
        ...action.payload.categoryDevices
      }
    case LOG_OUT:
      return defaultCategorysDevices;
    default:
      return state;
  }
}
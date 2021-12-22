import {
  GET_DEVICES,
  GET_TEMPERATURE_SENESORS,
  defaultDevices
} from "./devices.const";

import { LOG_OUT } from "../auth/auth.const";

export const devices = (state: MainState['devices'] = defaultDevices, action: Action) => {
  switch (action.type) {
    case GET_TEMPERATURE_SENESORS:
    case GET_DEVICES:
      return {
        ...state,
        tempHumSensors: action.payload.tempHumSensors,
      }
    case LOG_OUT:
      return defaultDevices;
    default:
      return state;
  }
}
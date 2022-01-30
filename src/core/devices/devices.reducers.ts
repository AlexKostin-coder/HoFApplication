import {
  GET_DEVICES,
  GET_TEMPERATURE_SENESORS,
  defaultDevices,
  defaultTemperatureSensors
} from "./devices.const";

import { LOG_OUT } from "../auth/auth.const";

export const devices = (state: MainState['devices'] = defaultDevices, action: Action) => {
  switch (action.type) {
    case GET_DEVICES:
      return {
        ...state,
        ...action.payload.devices,
      }
    case LOG_OUT:
      return defaultDevices;
    default:
      return state;
  }
}

export const temperature_sensors = (state: MainState['temperature_sensors'] = defaultTemperatureSensors, action: Action) => {
  switch (action.type) {
    case GET_DEVICES:
    case GET_TEMPERATURE_SENESORS:
      return {
        ...state,
        ...action.payload.temperature_sensors,
      }
    case LOG_OUT:
      return defaultTemperatureSensors;
    default:
      return state;
  }
}
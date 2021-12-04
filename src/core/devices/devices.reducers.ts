import {
  GET_TEMPERATURE_SENESORS,
  defaultDevices,
} from "./devices.const";

import { Devices } from './devices.types';

export const devices = (state: Devices = defaultDevices, action: Action) => {
  switch (action.type) {
    case GET_TEMPERATURE_SENESORS:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}
import {
  GET_DEVICES,
  GET_TEMPERATURE_SENESORS,
  GET_SEGMENT_CLOCK,
  GET_SETTINGS_SEGMENT_CLOCK,
  DELETE_SEGMENT_CLOCK,
  defaultDevices,
  defaultTemperatureSensors,
  defaultSegmentClocks,
  defaultSettingsSegmentClock
} from "./devices.const";

import { DELETE_TEMPERATURE_SENSORS_IN_ROOM } from "../rooms/rooms.const";
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

export const segment_clocks = (state: MainState['segment_clocks'] = defaultSegmentClocks, action: Action) => {
  switch (action.type) {
    case GET_SEGMENT_CLOCK:
      return {
        ...state,
        ...action.payload.segment_clocks,
      }
    case DELETE_SEGMENT_CLOCK:
      return {
        ...Object.keys(state)
          .filter((segmentClockId: string) => segmentClockId !== action.payload.segment_clock_id)
          .reduce((acc: MainState['segment_clocks'], segmentClockId: string) => {
            acc[segmentClockId] = state[segmentClockId];
            return acc;
          }, {})
      }
    case LOG_OUT:
      return defaultSegmentClocks;
    default:
      return state;
  }
}

export const settings_segment_clock = (state: MainState['settings_segment_clock'] = defaultSettingsSegmentClock, action: Action) => {
  switch (action.type) {
    case GET_SETTINGS_SEGMENT_CLOCK:
      return {
        ...state,
        ...action.payload.settings_segment_clock,
      }
    case DELETE_SEGMENT_CLOCK:
      return {
        ...Object.keys(state)
          .filter((settingsSegmentClockId: string) => state[settingsSegmentClockId].segment_clock !== action.payload.segment_clock_id)
          .reduce((acc: MainState['settings_segment_clock'], settingsSegmentClockId: string) => {
            acc[settingsSegmentClockId] = state[settingsSegmentClockId];
            return acc;
          }, {})
      }
    case LOG_OUT:
      return defaultSegmentClocks;
    default:
      return state;
  }

}
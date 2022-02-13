import {
  GET_TEMPERATURE_SENESORS,
  CHANGE_SETTINGS_SEGMENT_CLOCK
} from "./devices.const";

import {
  getDevicesData,
  SegmentClockData
} from "./devices.types";
import { normalizeDate } from "../tools/normalizeData";
import { setMessages } from "../ui/ui.actions";

export const getTemperatureSensorsByParam = (data: getDevicesData) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('POST', 'getTemperatureSensorsByParam', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

    const temperature_sensors = normalizeDate(res.data.temperature_sensors, 'temperature_sensors');

    return dispatch({
      type: GET_TEMPERATURE_SENESORS,
      payload: temperature_sensors
    });

  } catch (e: any) {
    return dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      })
    );
  }
}

export const changeSettingsSegmentClock = (data: SegmentClockData) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API) => {
  try {

    const res = await api('POST', 'settingsSegmentClock', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

    return dispatch({
      type: CHANGE_SETTINGS_SEGMENT_CLOCK,
      payload: {},
    });
  } catch (e: any) {
    return dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      })
    );
  }
}


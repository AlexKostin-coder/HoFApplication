import {
  GET_TEMPERATURE_SENESORS,
  CHANGE_SETTINGS_SEGMENT_CLOCK,
  GET_SEGMENT_CLOCK,
  GET_SETTINGS_SEGMENT_CLOCK,
  CHANGE_COLOR_CLOCK,
  DELETE_SEGMENT_CLOCK
} from "./devices.const";

import {
  getDevicesData,
  GetSegmentClocks,
  SegmentClockData,
  GetSegmentClocksSettings
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
      payload: res.data,
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

export const changeColorClock = (data: { color: { h: number, s: number, v: number }, settings_clock_id: string }) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {
    const res = await api('POST', 'changeColorClock', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

    return dispatch({
      type: CHANGE_COLOR_CLOCK,
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

export const getSegmentClocks = (data: GetSegmentClocks) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API) => {
  try {

    const res = await api('POST', 'getSegmentClockByParam', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

    const segment_clocks = normalizeDate(res.data.segment_clocks, 'segment_clocks');

    return dispatch({
      type: GET_SEGMENT_CLOCK,
      payload: segment_clocks,
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

export const getSettingsSegmentClock = (data: GetSegmentClocksSettings) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {
    const res = await api('POST', 'getSettingsSegmentClock', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

    const settings_segment_clock = normalizeDate(res.data.settings_segment_clock, 'settings_segment_clock');

    return dispatch({
      type: GET_SETTINGS_SEGMENT_CLOCK,
      payload: settings_segment_clock,
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

export const deleteSegmentClock = (data: { segment_clock_id: string, house_id: string, room_id?: string }) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {
    const res = await api('DELETE', 'segmentClock', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

    return dispatch({
      type: DELETE_SEGMENT_CLOCK,
      payload: data
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


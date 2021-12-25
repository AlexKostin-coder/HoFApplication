import {
  CREATE_ROOM,
  DELETE_ROOM,
  EDIT_ROOM,
  GET_ROOMS,
} from "./rooms.const";

import { GET_DEVICES } from './../devices/devices.const';
import { normalizeDate } from "../tools/normalizeData";
import { setMessages } from "../ui/ui.actions";

export const getRooms = () => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('GET', 'sensors/user/rooms');

    const rooms = normalizeDate(res.data, 'rooms', '_id');

    return dispatch({
      type: GET_ROOMS,
      payload: rooms
    });
  } catch (e: any) {
    return dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      })
    );
  }
};

export const getDevicesRoom = (id_room: String) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {
    const res = await api('POST', 'sensors/user/rooms/sensor', { id_room });

    const devices = normalizeDate(res.data, 'tempHumSensors', 'id_Sensor');

    return dispatch({
      type: GET_DEVICES,
      payload: devices
    });

  } catch (e: any) {
    return dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      })
    );
  }
};

export const editRoom = (data: { roomId: String, name: String }) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const {
      roomId,
      name
    } = data;

    const res = await api('PUT', 'sensors/user/rooms', { id: roomId, change: name });

    return dispatch({
      type: EDIT_ROOM,
      payload: {}
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

export const createRoom = (data: { name: String }) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const {
      name
    } = data;

    const res = await api('POST', 'sensors/user/rooms', { name });

    return dispatch({
      type: CREATE_ROOM,
      payload: {}
    });

  } catch (e: any) {
    return dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      })
    );
  }
};

export const deleteRoom = (roomId: String) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {
    const res = await api('DELETE', 'sensors/user/rooms', { id_Room: roomId });

    return dispatch({
      type: DELETE_ROOM,
      payload: { roomId }
    });

  } catch (e: any) {
    return dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      })
    );
  }
};


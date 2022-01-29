import {
  CREATE_ROOM,
  DELETE_ROOM,
  EDIT_ROOM,
  GET_ROOMS,
  UPLOAD_IMAGE_ROOM,
} from "./rooms.const";

import { GET_DEVICES } from './../devices/devices.const';
import { normalizeDate } from "../tools/normalizeData";
import { setMessages } from "../ui/ui.actions";

export const getRoomsByHouseId = (houseId: String) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('POST', 'getRoomsByHouseId', { houseId });

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

export const getRooms = () => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('GET', 'rooms');

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

    const res = await api('PATCH', 'rooms', data);

    const { room, house } = res.data;

    return dispatch({
      type: EDIT_ROOM,
      payload: { house, room }
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

export const createRoom = (data: { houseId: String, name: String }) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('POST', 'rooms', data);

    return dispatch({
      type: CREATE_ROOM,
      payload: res.data.room
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

export const deleteRoom = (houseId: String, roomId: String) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {
    const res = await api('DELETE', 'rooms', { houseId, roomId });

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

export const uploadImageRoom = (
  imageData: {
    height: number,
    uri: String,
    width: number,
    fileName: String
    type: String
    fileSize: number,
    roomId: String
  }
) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
    try {

      const data = new FormData();
      data.append('roomId', imageData.roomId);
      data.append('fileData', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.fileName,
      });

      const res = await api('POST', 'rooms/uploadImage', data, { uploadImage: true });

      return dispatch({
        type: UPLOAD_IMAGE_ROOM,
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
  };


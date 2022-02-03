import {
  ADD_TEMPERATURE_SENSORS_IN_ROOM,
  CREATE_ROOM,
  DELETE_ROOM,
  DELETE_TEMPERATURE_SENSORS_IN_ROOM,
  EDIT_ROOM,
  GET_ROOMS,
  UPLOAD_IMAGE_ROOM
} from "./rooms.const";
import {
  addTemperetureSensorsData,
  getRoomsByParamData
} from "./rooms.types";

import { normalizeDate } from "../tools/normalizeData";
import { setMessages } from "../ui/ui.actions";

export const getRoomsByParam = (data: getRoomsByParamData) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('POST', 'getRoomsByParam', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

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

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

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

export const editRoom = (data: { roomId: String, name: String }) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('PATCH', 'rooms', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

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

export const createRoom = (data: { houseId: String, name: String }) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('POST', 'rooms', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

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

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

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

export const addTemperetureSensors = (data: addTemperetureSensorsData) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {
    const res = await api('POST', 'addTemperetureSensors', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

    return dispatch({
      type: ADD_TEMPERATURE_SENSORS_IN_ROOM,
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

export const deleteTemperetureSensors = (data: addTemperetureSensorsData) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {
    const res = await api('POST', 'deleteTemperetureSensors', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

    return dispatch({
      type: DELETE_TEMPERATURE_SENSORS_IN_ROOM,
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


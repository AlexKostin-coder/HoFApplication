import { GET_DEVICES } from './../devices/devices.const';
import { GET_ROOMS } from "./rooms.const";
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
    dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      })
    )
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
    dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      })
    )
  }
}
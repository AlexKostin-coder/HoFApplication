import {
  CREATE_HOUSE,
  DELETE_HOUSE,
  EDIT_HOUSE,
  GET_HOUSES,
  SET_CURRENT_HOUSE_ID
} from "./houses.const";

import { normalizeDate } from "../tools/normalizeData";
import { setMessages } from "../ui/ui.actions";

export const getHouses = () => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('GET', 'houses');

    const houses = normalizeDate(res.data, 'houses', '_id');

    return dispatch({
      type: GET_HOUSES,
      payload: houses
    });

  } catch (e: any) {
    return dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      }),
    );
  }
};

export const createHouse = (name: string) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('POST', 'houses', { name });

    return dispatch({
      type: CREATE_HOUSE,
      payload: res.data
    });

  } catch (e: any) {
    return dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      }),
    );
  }
};

export const deleteHouse = (house_id: string) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('DELETE', 'houses', { house_id });

    return dispatch({
      type: DELETE_HOUSE,
      payload: { house_id },
    });

  } catch (e: any) {
    return dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      }),
    );
  }
};

export const editHouse = (house_id: string, name: string) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('PATCH', 'houses', { house_id, name });

    return dispatch({
      type: EDIT_HOUSE,
      payload: res.data,
    });
    
  } catch (e: any) {
    return dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      }),
    );
  }
}

export const setCurrentHouse = (house_id: string) => {
  return {
    type: SET_CURRENT_HOUSE_ID,
    payload: { house_id }
  }
};
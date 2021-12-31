import {
  EDIT_USER,
  GET_USER
} from "./users.const";

import { setMessages } from "../ui/ui.actions";

export const getUser = () => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {
    const res = await api('GET', 'users', {});

    return dispatch({
      type: GET_USER,
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

export const editUser = (data: { userId: String, name: String }) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('PATCH', 'users', data);

    return dispatch({
      type: EDIT_USER,
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
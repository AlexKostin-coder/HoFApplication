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
    const res = await api('GET', 'users');

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

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

export const editUser = (data: { name: String }) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('PATCH', 'users', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

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
import {
  GET_USER,
} from "./users.const";
import { setMessages } from "../ui/ui.actions";

export const getUser = () => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {
    const res = await api('GET', 'user', {});

    return dispatch({
      type: GET_USER,
      payload: { [res.data.user_id]: res.data },
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
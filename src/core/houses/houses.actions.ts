import { GET_HOUSES } from "./houses.const";
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
}
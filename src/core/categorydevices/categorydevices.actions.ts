import { GET_CATEGORYS } from './categoryDevices.const';
import { normalizeDate } from "../tools/normalizeData";
import { setMessages } from "../ui/ui.actions";

export const getCategory = () => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('GET', 'categoryDevices');

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

    const categoryDevices = normalizeDate(res.data.categoryDevices, 'categoryDevices');

    return dispatch({
      type: GET_CATEGORYS,
      payload: categoryDevices
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

export const getCategoryDevicesByUserId = () => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {
    const res = await api('GET', 'readCategoryDevicesByUserId');

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

    const categoryDevices = normalizeDate(res.data.categoryDevices, 'categoryDevices');

    return dispatch({
      type: GET_CATEGORYS,
      payload: categoryDevices
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

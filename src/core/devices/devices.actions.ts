import { GET_DEVICES } from "./devices.const";
import { getDevicesData } from "./devices.types";
import { normalizeDate } from "../tools/normalizeData";
import { setMessages } from "../ui/ui.actions";

export const getDevicesByParam = (data: getDevicesData) => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('POST', 'getDevicesByParam', data);

    if (res.data.message) {
      dispatch(
        setMessages({
          type: 'info',
          text: res.data.message,
        }),
      );
    }

    const { devices } = normalizeDate(res.data.devices, 'devices');

    return dispatch({
      type: GET_DEVICES,
      payload: { devices }
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
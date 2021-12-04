import { GET_TEMPERATURE_SENESORS } from "./devices.const";
import { normalizeDate } from "../tools/normalizeData";
import { setMessages } from "../ui/ui.actions";

export const getTemperatureSensors = () => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('GET', 'sensors/user', {});

    const tempHumSensors = normalizeDate(res.data, 'tempHumSensors', 'id_Sensor');

    return dispatch({
      type: GET_TEMPERATURE_SENESORS,
      payload: tempHumSensors
    });

  } catch (e: any) {
    dispatch(
      setMessages({
        type: 'warning',
        text: e.message,
      })
    );
  }
}
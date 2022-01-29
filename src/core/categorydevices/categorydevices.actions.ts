import { normalizeDate } from "../tools/normalizeData";
import { setMessages } from "../ui/ui.actions";

export const getCategory = () => async (
  dispatch: Dispatch,
  getState: GetStateType,
  api: API
) => {
  try {

    const res = await api('GET', 'category');

    console.log(res.data);

    return dispatch({
      type: 'VOID',
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
import { GET_AUTH } from "./auth.const";
import { setMessages } from '../ui/ui.actions';

export const getAuth = (
	email: string,
	password: string
) => async (
	dispatch: Dispatch,
	getState: GetStateType,
	api: API
) => {
		try {
			const res = await api('POST', 'users/login/app', { email, password });

			const authToken: string = res.data.token;

			return dispatch({
				type: GET_AUTH,
				payload: { authToken },
			});

		} catch (e: any) {
			dispatch(
				setMessages({
					type: 'warning',
					text: e.message,
				}),
			);
		}
	}
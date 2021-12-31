import {
	GET_AUTH,
	LOG_OUT,
} from "./auth.const";

import { setMessages } from '../ui/ui.actions';

export const getAuth = (email: string, password: string) => async (
	dispatch: Dispatch,
	getState: GetStateType,
	api: API
) => {
	try {
		const res = await api('POST', 'auth', { email, password });

		const authToken: string = res.data.token;

		return dispatch({
			type: GET_AUTH,
			payload: { authToken },
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

export const logOut = () => async (
	dispatch: Dispatch,
	getState: GetStateType,
	api: API
) => {
	try {
		return dispatch({
			type: LOG_OUT,
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
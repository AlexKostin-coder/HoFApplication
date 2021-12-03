import { GET_AUTH } from "./auth.const";

export const getAuth = (email = '', password = '') => async (dispatch: any, getState: any, api: any) => {
	try {
		const res = await api('POST', 'users/login/app', { email, password });

		if (!res.status) {
			throw new Error(res.errorText || "Трапилася помилка при запиті до сервера!");
		}

		const authToken = res.data.token;

		return dispatch({
			type: GET_AUTH,
			payload: { authToken },
		});

	} catch (e) {
		console.log({ e });
	}
}
import { GET_AUTH } from "./auth.const";

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

			if (!res.status) {
				throw new Error(res.errorText || "Трапилася помилка при запиті до сервера!");
			}

			const authToken: string = res.data.token;

			return dispatch({
				type: GET_AUTH,
				payload: { authToken },
			});

		} catch (e) {
			console.log({ e });
		}
	}
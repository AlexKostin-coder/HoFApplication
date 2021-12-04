import {
	GET_AUTH,
	LOG_OUT,
	defaultAuth
} from "./auth.const";

export const auth = (state: MainState['auth'] = defaultAuth, action: Action) => {
	switch (action.type) {
		case GET_AUTH:
			return {
				...state,
				...action.payload,
			}
		case LOG_OUT:
			return defaultAuth;
		default:
			return state;
	}
}
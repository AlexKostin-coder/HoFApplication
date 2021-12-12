import {
	GET_AUTH,
	LOG_OUT,
	defaultAuth
} from "./auth.const";

import { GET_USER } from "../users/users.const";

export const auth = (state: MainState['auth'] = defaultAuth, action: Action) => {
	switch (action.type) {
		case GET_AUTH:
			return {
				...state,
				authToken: action.payload.authToken,
			}
		case GET_USER:
			return {
				...state,
				user_id: action.payload.user_id,
			}
		case LOG_OUT:
			return defaultAuth;
		default:
			return state;
	}
}
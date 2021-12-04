import {
	GET_AUTH,
	defaultAuth
} from "./auth.const";

export const auth = (state: MainState['auth'] = defaultAuth, action: Action) => {
	switch (action.type) {
		case GET_AUTH:
			return {
				...state,
				...action.payload,
			}

		default:
			return state
	}
}
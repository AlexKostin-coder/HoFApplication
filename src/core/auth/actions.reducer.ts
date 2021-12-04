import {
	GET_AUTH,
	defaultAuth
} from "./auth.const";

import { AuthAction } from "./actions.types";

export const auth = (state: MainState['auth'] = defaultAuth, action: AuthAction) => {
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
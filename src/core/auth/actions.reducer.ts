import {
	GET_AUTH,
	defaultAuth
} from "./auth.const";

export const auth = (state = defaultAuth, action: any) => {
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
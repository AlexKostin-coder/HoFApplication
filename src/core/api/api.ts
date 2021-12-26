import {
	Headers,
	Methods,
	ResponseData,
} from "./api.types";

import { IS_LOCAL } from "./environment.const";
import { authTokenSelector } from "../auth/auth.selectors";
import axios from "axios";

const DOMAIN = IS_LOCAL
	? 'http://192.168.0.102:80/api/'
	: 'http://hofenterprise.com/';

export const sendRequest = async (
	url: string,
	method: Methods,
	headers: Headers,
	payload?: object,
	options?: { uploadImage: boolean }
) => {

	let result: ResponseData = {
		status: 400,
		data: {},
		errorText: '',
	};

	try {
		let sourceUrl = `${DOMAIN}${url}`;

		const {
			uploadImage = false,
		} = options || {};

		const response = await axios({
			method,
			url: sourceUrl,
			headers,
			...(payload && method !== 'GET'
				? uploadImage
					? { data: payload }
					: { data: JSON.stringify(payload) }
				: {}
			)
		});

		result = {
			status: response.status,
			data: response.data,
			errorText: ''
		};

	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response) {
				result = {
					status: e.response.status,
					data: {},
					errorText: e.response.data.errorText
				};
			}
		} else {
			throw e;
		}
	}

	return result;
}

export const createApi = (dispatch: Dispatch, getState: GetStateType) => async (
	method: Methods,
	url: string,
	payload?: object,
	options?: { uploadImage: boolean }
) => {

	try {
		const state = getState();
		const authToken = authTokenSelector(state);

		const {
			uploadImage = false,
		} = options || {};

		const headers: Headers = {
			'Accept': 'application/json',
			'Content-Type': uploadImage ? 'multipart/form-data' : 'application/json',
		};

		if (authToken) {
			headers.Authorization = `Bearer ${authToken}`;
		};

		const response: ResponseData = await sendRequest(
			url,
			method,
			headers,
			payload,
			options,
		);

		if (response.status >= 500) {
			throw new Error(response.errorText || 'Сервер не доступний!');
		}

		if (response.status === 401) {
			throw new Error(response.errorText || 'Cлід авторизуватись!');
		}

		if (response.status !== 200) {
			throw new Error(response.errorText || 'Трапилась помилка при запиті до сервера!');
		}

		return response;

	} catch (e) {
		throw e;
	}
}
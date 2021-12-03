import {
	Headers,
	Methods,
} from "./api.types";

import axios from "axios";

const DOMAIN = 'http://hofenterprise.com/';

export const sendRequest = async (
	url: string,
	method: Methods,
	headers: Headers,
	payload: object
) => {

	let result = {
		status: 400,
		data: {},
		errorText: '',
	};

	try {
		let sourceUrl = `${DOMAIN}${url}`;

		const response = await axios({
			method,
			url: sourceUrl,
			headers,
			...(payload && method !== 'GET' ? { data: JSON.stringify(payload) } : {})
		});

		result = {
			status: response.status,
			data: response.data,
			errorText: ''
		};

	} catch (e) {
		if (e.response) {
			result = {
				status: e.response.status,
				data: {},
				errorText: e.response.data.error
			};
		}
	}

	return result;
}

export const createApi = (dispatch, getState) => async (
	method: Methods,
	url: string,
	payload: object,
) => {

	try {
		const state = getState();
		const { authToken } = state.auth;

		const headers: Headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		};

		if (authToken) {
			headers.Authorization = `Bearer ${authToken}`;
		};

		const response = await sendRequest(
			url,
			method,
			headers,
			payload
		);

		if (response.status >= 500) {
			throw new Error(response.errorText || 'Сервер не доступний!');
		}

		if (response.status === 401) {
			throw new Error(response.errorText || 'Cлід авторизуватись!');
		}

		return response;

	} catch (e) {
		throw e;
	}
}
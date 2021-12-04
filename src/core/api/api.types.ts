export type Headers = {
	'Accept': string,
	'Content-Type': string,
	'Accept-Language'?: string,
	'Authorization'?: string,
};

export type Methods = 'POST' | 'GET' | 'DELETE' | 'PUT';

export type ResponseData = {
	status: number,
	data: any,
	errorText?: string,
};

export type Api = (
	method: Methods,
	url: string,
	payload: object,
) => Promise<ResponseData | never>

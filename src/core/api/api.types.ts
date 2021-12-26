export type Headers = {
	'Accept': string,
	'Content-Type': string,
	'Accept-Language'?: string,
	'Authorization'?: string,
};

export type Methods = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

export type ResponseData = {
	status: number,
	data: any,
	errorText?: string,
};

export type Api = (
	method: Methods,
	url: string,
	payload?: object,
	options?: { uploadImage: boolean }
) => Promise<ResponseData | never>

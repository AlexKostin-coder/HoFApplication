export type Headers = {
	'Accept': string,
	'Content-Type': string,
	'Accept-Language'?: string,
	'Authorization'?: string,
};

export type Methods = 'POST' | 'GET' | 'DELETE' | 'PUT';

export type ResponseData = {
	status: boolean,
    statusCode: number,
    data: object,
    errorText: string,
};

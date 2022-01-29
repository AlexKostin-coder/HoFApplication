import { Auth } from './actions.types';

export const GET_AUTH = 'GET_AUTH';
export const LOG_OUT = 'LOG_OUT';
export const REGISTRATION = 'REGISTRATION';

export const defaultAuth: Auth = {
    authToken: '',
    user_id: '',
};
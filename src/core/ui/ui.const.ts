import { UIState } from './ui.types';

export const SET_MESSAGE = 'SET_MESSAGE';
export const REMOVE_MESSAGES = 'REMOVE_MESSAGES';
export const REMOVE_MESSAGE_BY_KEY = 'REMOVE_MESSAGE_BY_KEY';

export const defaultUI: UIState = {
  messages: []
};

export const defaultElement = 'all';

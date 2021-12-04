import {
  InputMessage,
  InputMessages,
  Messages
} from './ui.types';
import {
  REMOVE_MESSAGES,
  REMOVE_MESSAGE_BY_KEY,
  SET_MESSAGE,
  defaultElement
} from './ui.const';

export function setMessages(messages: InputMessage | InputMessages): Action {
  const keyedMessages: Messages = [].concat(messages).map(message => ({
    ...message,
    key:
      Math.random()
        .toString(36)
        .substring(2) + Date.now().toString(36),
    element: message.element || defaultElement,
  }));

  return {
    type: SET_MESSAGE,
    payload: {
      messages: keyedMessages,
    },
  };
}

export function removeMessages(element: string): Action {
  return {
    type: REMOVE_MESSAGES,
    payload: {
      element,
    },
  };
}

export function removeMessageByKey(key: string): Action {
  return {
    type: REMOVE_MESSAGE_BY_KEY,
    payload: {
      key,
    },
  };
}
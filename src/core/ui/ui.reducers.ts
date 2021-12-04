import {
  REMOVE_MESSAGES,
  REMOVE_MESSAGE_BY_KEY,
  SET_MESSAGE,
  defaultUI
} from "./ui.const";

export const ui = (state: MainState['ui'] = defaultUI, action: Action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        messages: action.payload.messages,
      };
    case REMOVE_MESSAGES:
      return {
        ...state,
        messages: state.messages.filter(
          message => message.element !== action.payload.element,
        ),
      };
    case REMOVE_MESSAGE_BY_KEY:
      return {
        ...state,
        messages: state.messages.filter(
          message => message.key !== action.payload.key,
        ),
      };
    default:
      return state;
  }
};
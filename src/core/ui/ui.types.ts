export type UIState = {
  messages: Messages,
};

export interface InputMessage {
  type: 'error' | 'success' | 'info' | 'warning';
  text: string;
  element?: string;
  timeout?: number;
};
export interface Message extends InputMessage {
  key: string;
};

export type Messages = Array<Message>;

export type InputMessages = Array<InputMessage>;




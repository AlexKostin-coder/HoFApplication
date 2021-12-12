import { defaultUser } from "./users.const";

export const usersSelector = (state: MainState) => state.users;
export const authUserSelector = (state: MainState) => {
  const { user_id } = state.auth;
  if (!user_id || !state.users[user_id]) {
    return defaultUser;
  }

  return state.users[user_id];
};
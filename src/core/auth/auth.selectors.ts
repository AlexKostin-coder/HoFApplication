export const authTokenSelector = (state: MainState) => state.auth.authToken;
export const isLoginSelector = (state: MainState) => state.auth.authToken ? true : false;
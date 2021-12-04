export interface Auth {
    authToken: string,
}

export type AuthAction = {
    type: string,
    payload: Auth,
}
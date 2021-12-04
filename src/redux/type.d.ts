import { Api } from './../core/api/api.types';
import { Auth } from './../core/auth/actions.types';
import { AnyAction, Store } from "redux";


declare global {
    type MainState = {
        auth: Auth
    };

    type MainStorge = Store<MainState, AnyAction>;
    type GetStateType = MainStorge['getState'];
    type Dispatch = MainStorge['dispatch'];
    type API = Api;
}
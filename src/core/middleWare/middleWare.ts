import { createApi } from '../../core/api/api';

function thunkMiddleware() {
    return store => {
        const api = createApi(store.dispatch, store.getState);
        return next => action => {
            if (typeof action === 'function') {
                return action(store.dispatch, store.getState, api);
            }

            return next(action);
        };
    };
}
export default thunkMiddleware;
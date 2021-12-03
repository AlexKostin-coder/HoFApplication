import * as Auth from '../core/auth/actions.reducer';

import { combineReducers } from 'redux';

export default combineReducers({
    ...Auth,
});

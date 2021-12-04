import * as Auth from '../core/auth/actions.reducer';
import * as UI from '../core/ui/ui.reducers';

import { combineReducers } from 'redux';

export default combineReducers({
    ...Auth,
    ...UI,
});

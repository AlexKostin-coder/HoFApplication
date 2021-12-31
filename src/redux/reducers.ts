import * as Auth from '../core/auth/actions.reducer';
import * as Devices from '../core/devices/devices.reducers';
import * as Houses from '../core/houses/houses.reducers';
import * as Rooms from '../core/rooms/rooms.reducers';
import * as UI from '../core/ui/ui.reducers';
import * as Users from '../core/users/users.reducers';

import { combineReducers } from 'redux';

export default combineReducers({
    ...Auth,
    ...UI,
    ...Users,
    ...Devices,
    ...Rooms,
    ...Houses,
});

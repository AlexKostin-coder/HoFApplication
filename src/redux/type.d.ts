import { Rooms } from './../core/rooms/rooms.types';
import { Devices } from './../core/devices/devices.types';
import { UIState } from './../core/ui/ui.types';
import { Api } from './../core/api/api.types';
import { Auth } from './../core/auth/actions.types';
import { Users } from '../core/users/users.types';
import {
	Houses,
	CurrentHouseId
} from '../core/houses/houses.types';
import { AnyAction, Store } from "redux";


declare global {
	type MainState = {
		auth: Auth;
		ui: UIState;
		users: Users,
		devices: Devices,
		rooms: Rooms,
		houses: Houses
		currentHouseId: CurrentHouseId,
		categoryDevices: {}
	};

	type MainStorge = Store<MainState, AnyAction>;
	type GetStateType = MainStorge['getState'];
	type Dispatch = MainStorge['dispatch'];
	type Action = AnyAction;
	type API = Api;
}
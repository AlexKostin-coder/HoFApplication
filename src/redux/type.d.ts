import { Rooms } from './../core/rooms/rooms.types';
import {
	Devices,
	TempSensors,
	SegmentClocks,
	SettingsSegmentClocks
} from './../core/devices/devices.types';
import { UIState } from './../core/ui/ui.types';
import { Api } from './../core/api/api.types';
import { Auth } from './../core/auth/actions.types';
import { Users } from '../core/users/users.types';
import { CategorysDevice } from '../core/categoryDevices/categoryDevices.types';
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
		categoryDevices: CategorysDevice,
		temperature_sensors: TempSensors,
		segment_clocks: SegmentClocks,
		settings_segment_clock: SettingsSegmentClocks
	};

	type MainStorge = Store<MainState, AnyAction>;
	type GetStateType = MainStorge['getState'];
	type Dispatch = MainStorge['dispatch'];
	type Action = AnyAction;
	type API = Api;
}
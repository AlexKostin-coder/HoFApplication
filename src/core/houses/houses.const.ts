import {
  CurrentHouseId,
  House,
  Houses
} from './houses.types';

export const GET_HOUSES = 'GET_HOUSES';
export const SET_CURRENT_HOUSE_ID = 'SET_CURRENT_HOUSE_ID';

export const defaultCurrentHouseId: CurrentHouseId = {
  _id: ""
};

export const defaultHouse: House = {
  _id: '',
  name: '',
  owner_id: "",
  rooms_id: [],
  devices_id: [],
  members: [],
}

export const defaultHouses: Houses = {
  [defaultHouse._id]: defaultHouse
}
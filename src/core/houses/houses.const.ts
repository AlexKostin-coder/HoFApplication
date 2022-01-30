import {
  CurrentHouseId,
  House,
  Houses
} from './houses.types';

export const GET_HOUSES = 'GET_HOUSES';
export const SET_CURRENT_HOUSE_ID = 'SET_CURRENT_HOUSE_ID';
export const CREATE_HOUSE = 'CREATE_HOUSE';
export const DELETE_HOUSE = 'DELETE_HOUSE';
export const EDIT_HOUSE = 'EDIT_HOUSE';

export const defaultCurrentHouseId: CurrentHouseId = {
  _id: ""
};

export const defaultHouse: House = {
  _id: '',
  name: '',
  user: "",
  rooms: [],
}

export const defaultHouses: Houses = {
  [defaultHouse._id]: defaultHouse
}
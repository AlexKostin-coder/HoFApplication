import {
  Room,
  Rooms
} from './rooms.types';

export const GET_ROOMS = 'GET_ROOMS';
export const CREATE_ROOM = 'CREATE_ROOM';
export const EDIT_ROOM = 'EDIT_ROOM';
export const DELETE_ROOM = 'DELETE_ROOM';
export const UPLOAD_IMAGE_ROOM = 'UPLOAD_IMAGE_ROOM';
export const ADD_TEMPERATURE_SENSORS_IN_ROOM = 'ADD_TEMPERATURE_SENSORS_IN_ROOM';
export const DELETE_TEMPERATURE_SENSORS_IN_ROOM = 'DELETE_TEMPERATURE_SENSORS_IN_ROOM';

export const defaultRoom: Room = {
  _id: '',
  name: '',
  house: '',
  image_id: '',
  temperature_sensors: [],
};
export const defaultRooms: Rooms = {
  [defaultRoom._id]: defaultRoom
}
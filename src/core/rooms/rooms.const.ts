export const GET_ROOMS = 'GET_ROOMS';
export const CREATE_ROOM = 'CREATE_ROOM';
export const EDIT_ROOM = 'EDIT_ROOM';
export const DELETE_ROOM = 'DELETE_ROOM';
export const UPLOAD_IMAGE_ROOM = 'UPLOAD_IMAGE_ROOM';
export const defaultRoom = {
  _id: '',
  name: '',
  id_Sensor: [],
  image_id: '',
};
export const defaultRooms = {
  [defaultRoom._id]: defaultRoom
}
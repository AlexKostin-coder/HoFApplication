export interface Room {
  _id: string,
  name: string,
  house: string,
  image_id: string,
  temperature_sensors: Array<string>,
};

export interface Rooms {
  [key: string]: Room
}

export type getRoomsByParamData = {
  house_id?: String,
  room_id?: String,
}

export type addTemperetureSensorsData = {
  room_id?: String,
  devices_id: Array<string>
}
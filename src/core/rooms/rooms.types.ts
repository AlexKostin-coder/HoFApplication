export interface Room {
  _id: string,
  name: string,
  house: string,
  image_id: string,
  temperature_sensors: Array<string>,
  segment_clocks: string[],
};

export interface Rooms {
  [key: string]: Room
}

export type getRoomsByParamData = {
  house_id?: string,
  room_id?: string,
}

export type addTemperetureSensorsData = {
  room_id?: string,
  devices_id: Array<string>
}
export interface Room {
  _id: string,
  name: string,
  house: string,
  image_id: string,
  temperature_sensors: Array<String>,
};

export interface Rooms {
  [key: string]: Room
}

export type getRoomsByParamData = {
  house_id?: String,
  room_id?: String,
}
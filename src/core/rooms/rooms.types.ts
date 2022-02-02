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
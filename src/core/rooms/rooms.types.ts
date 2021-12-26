export interface Room {
  _id: string,
  name: string,
  id_Sensor: Array<string>
  image_id: string,
};

export interface Rooms {
  [key: string]: Room
}
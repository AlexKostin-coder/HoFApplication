export interface Room {
  _id: string,
  name: string,
  id_Sensor: Array<string>
};

export interface Rooms {
  [key: string]: Room
}
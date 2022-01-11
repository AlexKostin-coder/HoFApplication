export interface Room {
  _id: string,
  name: string,
  house_id: string,
  image_id: string,
  count_devices: number
};

export interface Rooms {
  [key: string]: Room
}
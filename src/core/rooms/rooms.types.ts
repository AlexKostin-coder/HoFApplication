export interface Room {
  _id: string,
  name: string,
  house_id: string,
  image_id: string,
};

export interface Rooms {
  [key: string]: Room
}
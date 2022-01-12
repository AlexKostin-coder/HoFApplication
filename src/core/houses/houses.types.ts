export type Houses = {
  [key: string]: House,
}

export type House = {
  name: string,
  _id: string,
  owner_id: string,
  count_rooms: number,
  count_devices: number,
}

export type CurrentHouseId = {
  _id: string,
}
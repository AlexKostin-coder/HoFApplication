export type Houses = {
  [key: string]: House,
}

export type House = {
  name: string,
  _id: string,
  devices_id: Array<string>,
  rooms_id: Array<string>,
  members: [],
  owner_id: string,
}

export type CurrentHouseId = {
  _id: string,
}
export type Houses = {
  [key: string]: House,
}

export type House = {
  name: string,
  _id: string,
  rooms: Array<string>,
  temperature_sensors: Array<string>,
}

export type CurrentHouseId = {
  _id: string,
}
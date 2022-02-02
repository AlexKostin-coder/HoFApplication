export type Houses = {
  [key: string]: House,
}

export type House = {
  name: string,
  _id: string,
  rooms: Array<String>,
  temperature_sensors: Array<String>,
}

export type CurrentHouseId = {
  _id: string,
}
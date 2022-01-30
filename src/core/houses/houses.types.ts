export type Houses = {
  [key: string]: House,
}

export type House = {
  name: string,
  _id: string,
  user: string,
  rooms: Array<String>,
}

export type CurrentHouseId = {
  _id: string,
}
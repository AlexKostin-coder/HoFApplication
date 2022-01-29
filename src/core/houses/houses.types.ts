export type Houses = {
  [key: string]: House,
}

export type House = {
  name: string,
  _id: string,
  user_id: string,
  rooms_id: Array<String>,
}

export type CurrentHouseId = {
  _id: string,
}
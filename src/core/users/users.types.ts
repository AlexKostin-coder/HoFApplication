export type User = {
  _id: string,
  name: string,
  email: string,
  photo: string,
  temperature_sensors: string[],
  segment_clocks: string[],
}

export type Users = {
  [key: string]: User,
}
export type CategoryDevice = {
  _id: string,
  name: string,
  alias: string,
  image_id: string,
}

export type CategorysDevice = {
  [key: string]: CategoryDevice
}
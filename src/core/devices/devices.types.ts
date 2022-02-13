export type Devices = {
  [key: string]: Device
}

export type Device = {
  _id: string,
  user: string,
  house: string,
}

export type getDevicesData = {
  house_id?: string,
  room_id?: string,
}

export type TempHumSensorTypes = {
  Sensor: string
  StatusTemp: string
  StatusHum: string
  Range_max: string
  Range_min: string
  Battery_charge: string
  _id: string
  id_Sensor: string
  StartTime: Array<{}>,
  EndTime: Array<{}>,
}

export type TempSensor = {
  _id: string,
  name: string,
  temperature: number,
  category: string,
  house: string,
  room: string
}

export type TempSensors = {
  [key: string]: TempSensor
}

export type SegmentClockData = {
  
}
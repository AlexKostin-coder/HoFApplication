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
  room: string,
  type: string
}

export type TempSensors = {
  [key: string]: TempSensor
}

export type SegmentClockData = {
  settings_clock_id: String,
  auto_bright?: boolean,
  bright?: number
}

export type GetSegmentClocks = {
  segment_clocks_id?: string[],
  house_id?: string
}

export type GetSegmentClocksSettings = {
  segment_clock_id: string,
}

export type SegmentClock = {
  _id: string,
  temperature: number,
  humidity: number,
  pressure: number,
  altitude: number,
  house: string,
  room: string,
  type: string
  name: string,
  settings: string,
}

export type SegmentClocks = {
  [key: string]: SegmentClock
}

export type SettingSegmentClock = {
  last_colors: Array<{ h: number, s: number, v: number }>,
  auto_bright: boolean,
  bright: number,
  min_bright: number,
  max_bright: number,
  _id: string,
  segment_clock: string,
}

export type SettingsSegmentClocks = {
  [key: string]: SettingSegmentClock
}

export type Devices = {
  tempHumSensors: {
    [key: string]: TempHumSensor
  }
}

export type TempHumSensor = {
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
import {
  Device,
  Devices
} from "./devices.types";

export const GET_TEMPERATURE_SENESORS = 'GET_TEMPERATURE_SENESORS';
export const GET_DEVICES = "GET_DEVICES";

export const tempHumSensor = {
  Sensor: '',
  StatusTemp: '',
  StatusHum: '',
  Range_max: '',
  Range_min: '',
  Battery_charge: '',
  _id: '',
  id_Sensor: '',
  StartTime: [],
  EndTime: [],
};

export const defaultDevice: Device = {
  _id: '',
  user_id: '',
  house_id: '',
}

export const defaultDevices: Devices = {
  [defaultDevice._id]: defaultDevice
};
import {
  Device,
  Devices,
  TempSensor,
  TempSensors
} from "./devices.types";

export const GET_TEMPERATURE_SENESORS = 'GET_TEMPERATURE_SENESORS';
export const GET_DEVICES = "GET_DEVICES";
export const CHANGE_SETTINGS_SEGMENT_CLOCK = "CHANGE_SETTINGS_SEGMENT_CLOCK";

export const defaultTemperatureSensor: TempSensor = {
  _id: "",
  name: "",
  temperature: 0,
  category: "",
  room: "",
  house: "",
};

export const defaultTemperatureSensors: TempSensors = {
  [defaultTemperatureSensor._id]: defaultTemperatureSensor
};

export const defaultDevice: Device = {
  _id: '',
  user: '',
  house: '',
}

export const defaultDevices: Devices = {
  [defaultDevice._id]: defaultDevice
};
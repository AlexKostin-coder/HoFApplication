import {
  Device,
  Devices,
  TempSensor,
  TempSensors,
  SegmentClock,
  SegmentClocks,
  SettingSegmentClock,
  SettingsSegmentClocks,
} from "./devices.types";

export const GET_TEMPERATURE_SENESORS = 'GET_TEMPERATURE_SENESORS';
export const GET_DEVICES = "GET_DEVICES";
export const CHANGE_SETTINGS_SEGMENT_CLOCK = "CHANGE_SETTINGS_SEGMENT_CLOCK";
export const GET_SEGMENT_CLOCK = "GET_SEGMENT_CLOCK";
export const GET_SETTINGS_SEGMENT_CLOCK = "GET_SETTINGS_SEGMENT_CLOCK";
export const CHANGE_COLOR_CLOCK = 'CHANGE_COLOR_CLOCK';
export const DELETE_SEGMENT_CLOCK = 'DELETE_SEGMENT_CLOCK';

export const defaultTemperatureSensor: TempSensor = {
  _id: "",
  name: "",
  temperature: 0,
  category: "",
  room: "",
  house: "",
  type: "temperature",
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

export const defaultSegmentClock: SegmentClock = {
  _id: "",
  temperature: 0,
  humidity: 0,
  pressure: 0,
  altitude: 0,
  name: "",
  house: "",
  room: "",
  type: "clock",
  settings: "",
}

export const defaultSegmentClocks: SegmentClocks = {
  [defaultSegmentClock._id]: defaultSegmentClock,
}

export const defaultSettingSegmentClock: SettingSegmentClock = {
  last_colors: [],
  auto_bright: false,
  bright: 30,
  min_bright: 0,
  max_bright: 0,
  _id: "",
  segment_clock: "",
}

export const defaultSettingsSegmentClock: SettingsSegmentClocks = {
  [defaultSettingSegmentClock._id]: defaultSettingSegmentClock,
}
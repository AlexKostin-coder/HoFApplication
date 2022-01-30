import {
  CategoryDevice,
  CategorysDevice
} from "./categoryDevices.types";

export const GET_CATEGORYS = "GET_CATEGORYS";
export const defaultCategoryDevices: CategoryDevice = {
  _id: "",
  name: "",
  alias: "",
  image_id: "",
};

export const defaultCategorysDevices: CategorysDevice = {
  [defaultCategoryDevices._id]: defaultCategoryDevices
};
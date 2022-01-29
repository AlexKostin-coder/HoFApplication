import { LOG_OUT } from "../auth/auth.const";
import {
  defaultCategoryDevices
} from "./categorydevices.const";

export const categoryDevices = (state: MainState['categoryDevices'] = defaultCategoryDevices, action: Action) => {
  switch (action.type) {
    case LOG_OUT:
      return defaultCategoryDevices;
    default:
      return state;
  }
}
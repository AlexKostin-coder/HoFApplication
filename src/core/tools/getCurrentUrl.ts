import { IS_LOCAL } from "../api/environment.const";

export const getCurrentUrl = () => {
  return IS_LOCAL
    ? 'http://192.168.0.102:80/'
    : 'http://hofenterprise.com/';
}
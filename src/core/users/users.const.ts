import {
  User,
  Users
} from "./users.types";

export const GET_USER = 'GET_USER';
export const EDIT_USER = 'EDIT_USER';

export const defaultUser: User = {
  _id: '',
  name: '',
  email: '',
  photo: ''
};

export const defaultUsers: Users = {
  [defaultUser._id]: defaultUser
}
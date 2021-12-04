import {
  User,
  Users
} from "./users.types";

export const GET_USER = 'GET_USER';

export const defaultUser: User = {
  user_id: '',
  name: '',
  email: '',
  photo: ''
};

export const defaultUsers: Users = {
  [defaultUser.user_id]: defaultUser
}
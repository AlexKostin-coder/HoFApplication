export type User = {
  user_id: string,
  name: string,
  email: string,
  photo: string
}

export type Users = {
  [key: string]: User,
}
export interface IUserResponse {
  message: string;
  status: string;
  data?: any;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
}
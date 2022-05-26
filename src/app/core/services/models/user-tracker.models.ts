export interface IUserResponse {
  message: string;
  status: string;
  data: {
    id?: string
    username?: string
    token?: string
  };
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
}